import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from '../auth/entities/user.entity';
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
export class PostsService implements OnModuleInit {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(PostViewLog)
    private readonly postViewLogRepository: Repository<PostViewLog>,
    private readonly handlerException: HandlerException,
  ) {}

  onModuleInit() {
    console.log('inicio del modulo de posts');
  }

  private createBaseQuery(userId?: string): SelectQueryBuilder<Post> {
    const query = this.postRepository
      .createQueryBuilder('post')
      .loadRelationCountAndMap('post.likesCount', 'post.likes')
      .leftJoinAndSelect('post.author', 'author')
      .leftJoinAndSelect('post.category', 'category');

    if (userId) {
      query.loadRelationCountAndMap(
        'post.isLiked',
        'post.likes',
        'userLike',
        (qb) => qb.where('userLike.user_id = :userId', { userId }),
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
    post: Post & { likesCount?: number; isLiked?: number },
  ): PostResponse {
    return {
      ...post,
      likesCount: post.likesCount || 0,
      isLiked: post.isLiked > 0,
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

    if (options?.onlyPublished) {
      query.where('post.status = :status', {
        status: PostStatus.PUBLISHED,
      });
    }

    const whereClause = options?.onlyPublished ? 'andWhere' : 'where';
    if (isUUID(term)) {
      query[whereClause]('post.id = :term', { term });
    } else {
      query[whereClause]('post.slug = :term OR post.title ILIKE :term', {
        term,
      });
    }

    const post = await this.executeQuery(() => query.getOne());

    if (!post) throw new NotFoundException(`Post "${term}" not found`);

    const recentView = await this.executeQuery(async () => {
      return await this.postViewLogRepository.findOne({
        where: [
          { post: { id: post.id }, user: { id: userId } },
          { post: { id: post.id }, ip: options?.ip },
        ],
      });
    });

    if (options?.onlyPublished && !recentView) {
      console.log(
        'Esto se esta ejecutando porque no hay view de este usuario a este post',
      );
      const newViewLog = this.postViewLogRepository.create({
        post,
        user: userId ? { id: userId } : null,
        ip: options?.ip,
      });
      await this.executeQuery(async () => {
        await this.postViewLogRepository.save(newViewLog);
        await this.postRepository.increment({ id: post.id }, 'viewsCount', 1);
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
}
