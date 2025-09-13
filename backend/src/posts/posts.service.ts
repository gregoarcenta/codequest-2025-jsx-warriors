import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { User } from '../auth/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { Repository } from 'typeorm';
import { PostStatus } from './enums/post-status';

@Injectable()
export class PostsService implements OnModuleInit {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
  ) {}

  onModuleInit() {
    console.log('inicio del modulo de posts');
  }

  create(createPostDto: CreatePostDto, user: User) {
    return {
      createPostDto,
      user,
    };
  }

  findAll() {
    return `This action returns all posts`;
  }

  findAllPublished() {
    return `This action returns all posts published`;
  }

  findAllFeatured() {
    return `This action returns all posts featured`;
  }

  findOne(slug: string) {
    return `This action returns a #${slug} post`;
  }

  update(id: string, updatePostDto: UpdatePostDto) {
    const msg = `This action updates a #${id} post`;
    return {
      message: msg,
      updatePostDto,
    };
  }

  remove(id: string) {
    return `This action removes a #${id} post`;
  }

  async publishPost(id: string) {
    const post = await this.postRepository.findOne({ where: { id } });
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    post.status = PostStatus.PUBLISHED;
    return await this.postRepository.save(post);
  }

  async archivePost(id: string) {
    const post = await this.postRepository.findOne({ where: { id } });
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    post.status = PostStatus.ARCHIVED;
    return await this.postRepository.save(post);
  }

  async draftPost(id: string) {
    const post = await this.postRepository.findOne({ where: { id } });
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    post.status = PostStatus.DRAFT;
    return await this.postRepository.save(post);
  }
}
