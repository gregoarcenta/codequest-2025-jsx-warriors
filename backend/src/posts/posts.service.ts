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

  async create(createPostDto: CreatePostDto, user: User) {
    try {
      const post = this.postRepository.create({
        ...createPostDto,
        author: user,
        category: {
          id: createPostDto.categoryId,
        },
      });

      const savedPost = await this.postRepository.save(post);

      await this.userRepository.increment({ id: user.id }, 'postsCount', 1);

      return savedPost;
    } catch (err) {
      return this.handlerException.handlerDBException(err);
    }
  }

  async findAll() {
    return `This action returns all posts`;
  }

  async findOne(
    term: string,
    options?: { onlyPublished?: boolean },
  ): Promise<Post> {
    let post: Post = null;
    const query = this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.author', 'author')
      .leftJoinAndSelect('post.category', 'category');

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

    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    const msg = `This action updates a #${id} post`;
    return {
      message: msg,
      updatePostDto,
    };
  }

  async updatePostStatus(id: string, status: PostStatus) {
    const post = await this.findOne(id);

    post.status = status;
    try {
      await this.postRepository.save(post);
    } catch (err) {
      this.handlerException.handlerDBException(err);
    }
    return post;
  }

  findAllPublished() {
    return `This action returns all posts published`;
  }

  findAllFeatured() {
    return `This action returns all posts featured`;
  }
}
