import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from '../users/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { PostStatus } from './enums/post-status';
import { HandlerException } from '../common/exceptions/handler.exception';
import { isUUID } from 'class-validator';
import { PostResponse } from './interfaces/post.response';
import { PostsFilterDto } from './dto/filter.dto';
import { PaginateDto } from '../common/dto/paginate.dto';
import { PostsResponse } from './interfaces/posts.response';
import { SortBy } from './enums/sort-by';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostViewLog } from './entities/post-view-log.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @InjectRepository(PostViewLog)
    private readonly postViewLogRepository: Repository<PostViewLog>,
    private readonly handlerException: HandlerException,
  ) {}

  private createBaseQuery(userId?: string): SelectQueryBuilder<Post> {
    const query = this.postRepository
      .createQueryBuilder('post')
      .loadRelationCountAndMap('post.likesCount', 'post.likes')
      .loadRelationCountAndMap(
        'post.commentsCount',
        'post.comments',
        'postComments',
        (qb) => qb.where('postComments.is_visible = true'),
      )
      .leftJoinAndSelect('post.author', 'author')
      .leftJoinAndSelect('post.category', 'category');

    if (userId) {
      query
        // Para saber si le ha dado like a un post
        .loadRelationCountAndMap(
          'post.isLiked',
          'post.likes',
          'userLike',
          (qb) => qb.where('userLike.user_id = :userId', { userId }),
        )
        // Para saber si ha guardado un post
        .loadRelationCountAndMap(
          'post.isSaved',
          'post.bookmarks',
          'userSaved',
          (qb) => qb.where('userSaved.user_id = :userId', { userId }),
        );
    }

    return query;
  }

  private async executeQuery<T>(operation: () => Promise<T>): Promise<T> {
    try {
      return await operation();
    } catch (err) {
      return this.handlerException.handlerDBException(err);
    }
  }

  private calculatePagination(page: number, limit: number) {
    return {
      skip: (page - 1) * limit,
      take: limit,
    };
  }

  private createPaginatedResponse(
    posts: Post[],
    total: number,
    page: number,
    limit: number,
  ): PostsResponse {
    return {
      posts: posts.map((post) => this.transformPostData(post)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  private applyFilters(
    query: SelectQueryBuilder<Post>,
    filters: {
      title?: string;
      categoryId?: string;
      authorId?: string;
      onlyPublished?: boolean;
    },
  ) {
    const { title, categoryId, authorId, onlyPublished } = filters;

    if (onlyPublished) {
      query.where('post.status = :status', { status: PostStatus.PUBLISHED });
    }

    if (title) {
      const whereClause = onlyPublished ? 'andWhere' : 'where';
      query[whereClause]('post.title ILIKE :title', { title: `%${title}%` });
    }

    if (categoryId) {
      const whereClause = !onlyPublished && !title ? 'where' : 'andWhere';
      query[whereClause]('category.id = :categoryId', { categoryId });
    }

    if (authorId) {
      const whereClause =
        !onlyPublished && !title && !categoryId ? 'where' : 'andWhere';
      query[whereClause]('author.id = :authorId', { authorId });
    }
  }

  private transformPostData(
    post: Post & { likesCount?: number; isLiked?: number; isSaved?: number },
  ): PostResponse {
    return {
      ...post,
      likesCount: post.likesCount || 0,
      isLiked: post.isLiked > 0,
      isSaved: post.isSaved > 0,
      author: {
        id: post.author.id,
        fullName: post.author.fullName,
      },
      category: {
        id: post.category?.id,
        name: post.category?.name,
      },
    };
  }

  async create(
    createPostDto: CreatePostDto,
    user: User,
  ): Promise<PostResponse> {
    return this.executeQuery(async () => {
      const post = this.postRepository.create({
        ...createPostDto,
        author: user,
        category: { id: createPostDto.categoryId },
      });

      await this.postRepository.save(post);
      return this.findOne(post.id);
    });
  }

  async update(
    id: string,
    updatePostDto: UpdatePostDto,
  ): Promise<PostResponse> {
    const post = await this.executeQuery(async () => {
      return await this.postRepository.preload({
        id,
        category: {
          id: updatePostDto.categoryId,
        },
        ...updatePostDto,
      });
    });

    if (!post) throw new NotFoundException(`Post "${id}" not found`);

    await this.executeQuery(async () => await this.postRepository.save(post));

    return this.findOne(id);
  }

  async findOne(
    term: string,
    userId?: string,
    options?: { onlyPublished?: boolean; ip?: string },
  ): Promise<PostResponse> {
    const query = this.createBaseQuery(userId);
    const status = PostStatus.PUBLISHED;

    // si options?.onlyPublished es true, buscamos por status publish
    if (options?.onlyPublished) {
      query.where('post.status = :status', { status });
      // .leftJoinAndSelect(
      //   'post.comments',
      //   'comments',
      //   'comments.parent IS NULL',
      // )
      // .leftJoinAndSelect('comments.author', 'commentAuthor')
      // .leftJoinAndSelect('comments.children', 'childComments')
      // .leftJoinAndSelect('childComments.author', 'childCommentAuthor')
      // .orderBy('comments.createdAt', 'DESC')
      // .addOrderBy('childComments.createdAt', 'DESC');
    }

    const whereClause = options?.onlyPublished ? 'andWhere' : 'where';

    // Si es un ID, buscamos por ID
    if (isUUID(term)) {
      query[whereClause]('post.id = :term', { term });
    } else {
      // Si no buscamos por titulo o slug
      query[whereClause]('post.slug = :term OR post.title ILIKE :term', {
        term,
      });
    }

    const post = await this.executeQuery(() => query.getOne());

    if (!post) throw new NotFoundException(`Post "${term}" not found`);

    // Verificamos si el post ha sido visto por el usuario o por su IP
    const recentView = await this.executeQuery(async () => {
      return await this.postViewLogRepository.findOne({
        where: [
          { post: { id: post.id }, user: { id: userId } },
          { post: { id: post.id }, ip: options?.ip },
        ],
      });
    });

    // Si el post no ha sido visto por el usuario y es un post publicado, lo registramos
    if (options?.onlyPublished && !recentView) {
      await this.executeQuery(async () => {
        await this.postRepository.manager.transaction(async (manager) => {
          const viewRepo = manager.getRepository(PostViewLog);
          const postRepo = manager.getRepository(Post);
          const exists = await viewRepo.findOne({
            where: [
              { post: { id: post.id }, user: { id: userId } },
              { post: { id: post.id }, ip: options?.ip },
            ],
          });

          if (!exists) {
            const newViewLog = viewRepo.create({
              post,
              user: userId ? { id: userId } : null,
              ip: options?.ip,
            });
            await viewRepo.save(newViewLog);
            await postRepo.increment({ id: post.id }, 'viewsCount', 1);
          }
        });
      });
    }

    return this.transformPostData(post);
  }

  async findAll(
    { limit, page, title, categoryId, authorId, sortBy }: PostsFilterDto,
    userId?: string,
    options?: { onlyPublished?: boolean },
  ): Promise<PostsResponse> {
    const query = this.createBaseQuery(userId);
    const { skip, take } = this.calculatePagination(page, limit);

    this.applyFilters(query, {
      title,
      categoryId,
      authorId,
      onlyPublished: options?.onlyPublished,
    });

    switch (sortBy) {
      case SortBy.RECENT:
        query.orderBy('post.publishedAt', 'DESC');
        break;
      case SortBy.OLD:
        query.orderBy('post.publishedAt', 'ASC');
        break;
      case SortBy.VIEWED:
        query
          .orderBy('post.viewsCount', 'DESC')
          .addOrderBy('post.publishedAt', 'DESC');
        break;
      case SortBy.LIKED:
        query
          .addSelect(
            `(SELECT COUNT(*) FROM post_likes pl WHERE pl.post_id = post.id)`,
            'likes_count',
          )
          .orderBy('likes_count', 'DESC')
          .addOrderBy('post.publishedAt', 'DESC');
        break;
      default:
        query.orderBy('post.publishedAt', 'DESC');
    }

    query.take(take).skip(skip);

    const [posts, total] = await this.executeQuery(() =>
      query.getManyAndCount(),
    );

    return this.createPaginatedResponse(posts, total, page, limit);
  }

  async findAllFeatured(
    { limit, page }: PaginateDto,
    userId: string,
  ): Promise<PostsResponse> {
    const query = this.createBaseQuery(userId);
    const { skip, take } = this.calculatePagination(page, limit);

    query
      .where('post.status = :status AND post.is_featured = true', {
        status: PostStatus.PUBLISHED,
      })
      .orderBy('post.publishedAt', 'DESC')
      .take(take)
      .skip(skip);

    const [posts, total] = await this.executeQuery(() =>
      query.getManyAndCount(),
    );

    return this.createPaginatedResponse(posts, total, page, limit);
  }

  async updatePostStatus(
    id: string,
    status: PostStatus,
  ): Promise<PostResponse> {
    const post = await this.findOne(id);

    post.status = status;
    if (status === PostStatus.PUBLISHED && !post.publishedAt) {
      post.publishedAt = new Date();
    }

    return this.executeQuery(() => this.postRepository.save(post));
  }

  async findRelated(postId: string): Promise<Post[]> {
    const MAX_RESULTS = 4;
    const base = await this.postRepository.findOne({
      where: { id: postId },
      relations: ['category', 'author'],
    });

    if (!base) {
      return [];
    }

    const titleWords = base.title
      .replace(/[^\w\s]/g, ' ')
      .trim()
      .split(/\s+/)
      .join(' '); // No uses '|', plainto_tsquery lo hace por ti

    const query = this.postRepository.createQueryBuilder('post');

    query
      .leftJoinAndSelect('post.category', 'category')
      .leftJoinAndSelect('post.author', 'author')
      .leftJoin('post.likes', 'likes');

    query
      .where('post.id != :id', { id: base.id })
      .andWhere('post.status = :status', { status: PostStatus.PUBLISHED });

    query.orderBy(
      `ts_rank(to_tsvector('spanish', post.title || ' ' || post.content), plainto_tsquery('spanish', :tsQuery))`,
      'DESC',
    );

    query.addOrderBy(
      `CASE WHEN post.category.id = :categoryId THEN 1 ELSE 0 END`,
      'DESC',
    );
    query.addOrderBy(
      `CASE WHEN post.author.id = :authorId THEN 1 ELSE 0 END`,
      'DESC',
    );

    query.addOrderBy('COUNT(likes.id)', 'DESC');
    query.addOrderBy('post.views_count', 'DESC');
    query.addOrderBy('post.publishedAt', 'DESC');

    query.groupBy('post.id, category.id, author.id');

    query.setParameters({
      id: base.id,
      authorId: base.author.id,
      categoryId: base.category.id,
      tsQuery: titleWords,
    });

    query.limit(MAX_RESULTS);

    return query.getMany();
  }
}
