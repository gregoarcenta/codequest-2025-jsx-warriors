import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { User } from '../auth/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { PostStatus } from './enums/post-status';
import { HandlerException } from '../common/exceptions/handler.exception';
import { isUUID } from 'class-validator';
import { PostResponse } from './interfaces/post.response';
import { PostsFilterDto } from './dto/filter.dto';
import { PaginateDto } from '../common/dto/paginate.dto';
import { PostsResponse } from './interfaces/posts.response';
import { SortBy } from './enums/sort-by';

@Injectable()
export class PostsService implements OnModuleInit {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly handlerException: HandlerException,
  ) {}

  onModuleInit() {
    console.log('inicio del modulo de posts');
  }

  async create(
    createPostDto: CreatePostDto,
    user: User,
  ): Promise<PostResponse> {
    try {
      const post = this.postRepository.create({
        ...createPostDto,
        author: user,
        category: {
          id: createPostDto.categoryId,
        },
      });

      await this.postRepository.save(post);

      return this.findOne(post.id);
    } catch (err) {
      return this.handlerException.handlerDBException(err);
    }
  }

  async findOne(
    term: string,
    userId?: string,
    options?: { onlyPublished?: boolean },
  ): Promise<PostResponse> {
    let post: Post = null;
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

    if (isUUID(term)) query.where('post.id = :term', { term });
    else
      query
        .where('post.slug = :term', { term })
        .orWhere('post.title ILIKE :term', { term });

    if (options?.onlyPublished) {
      query.andWhere('post.status = :status', { status: 'published' });
    }

    try {
      post = await query.getOne();
    } catch (err) {
      this.handlerException.handlerDBException(err);
    }

    if (!post) throw new NotFoundException(`Post "${term}" not found`);

    return this.transformPostData(post);
  }

  async update(
    id: string,
    updatePostDto: UpdatePostDto,
  ): Promise<PostResponse> {
    let post: Post = null;
    try {
      post = await this.postRepository.preload({
        id,
        category: {
          id: updatePostDto.categoryId,
        },
        ...updatePostDto,
      });
    } catch (err) {
      this.handlerException.handlerDBException(err);
    }

    if (!post) throw new NotFoundException(`Post "${id}" not found`);

    try {
      await this.postRepository.save(post);
    } catch (err) {
      this.handlerException.handlerDBException(err);
    }

    return this.findOne(id);
  }

  async updatePostStatus(
    id: string,
    status: PostStatus,
  ): Promise<PostResponse> {
    const post = await this.findOne(id);

    post.status = status;
    try {
      await this.postRepository.save(post);
    } catch (err) {
      this.handlerException.handlerDBException(err);
    }
    return post;
  }

  async findAll(
    postsFilterDto: PostsFilterDto,
    userId?: string,
    options?: { onlyPublished?: boolean },
  ): Promise<PostsResponse> {
    const { limit, page, title, categoryId, authorId, sortBy } = postsFilterDto;
    const skip = (page - 1) * limit;

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

    if (options?.onlyPublished) {
      query.where('post.status = :status', { status: PostStatus.PUBLISHED });
    }

    if (title) {
      const whereClause = options?.onlyPublished ? 'andWhere' : 'where';
      query[whereClause]('post.title ILIKE :title', { title: `%${title}%` });
    }

    if (categoryId) {
      const whereClause =
        !options?.onlyPublished && !title ? 'where' : 'andWhere';
      query[whereClause]('category.id = :categoryId', { categoryId });
    }

    if (authorId) {
      const whereClause =
        !options?.onlyPublished && !title && !categoryId ? 'where' : 'andWhere';
      query[whereClause]('author.id = :authorId', { authorId });
    }

    switch (sortBy) {
      case SortBy.RECENT:
        query.orderBy('post.publishedAt', 'DESC');
        break;
      case SortBy.OLD:
        query.orderBy('post.publishedAt', 'ASC');
        break;
    }

    query.take(limit).skip(skip);

    const [posts, total] = await query.getManyAndCount();

    return {
      posts: posts.map((post) => this.transformPostData(post)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findAllFeatured(
    paginateDto: PaginateDto,
    userId: string,
  ): Promise<PostsResponse> {
    const { limit, page } = paginateDto;
    const skip = (page - 1) * limit;

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

    const [posts, total] = await query
      .where('post.status = :status AND post.is_featured = true', {
        status: PostStatus.PUBLISHED,
      })
      .orderBy('post.publishedAt', 'DESC')
      .take(limit)
      .skip(skip)
      .getManyAndCount();

    return {
      posts: posts.map((post) => this.transformPostData(post)),
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  transformPostData(
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
}
