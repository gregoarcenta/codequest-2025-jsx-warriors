import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HandlerException } from '../common/exceptions/handler.exception';
import { PostLike } from './entities/postLike.entity';
import { CommentLike } from './entities/commentLike.entity';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(PostLike)
    private postLikesRepository: Repository<PostLike>,
    @InjectRepository(CommentLike)
    private commentLikesRepository: Repository<CommentLike>,
    private readonly handlerException: HandlerException,
  ) {}

  async togglePostLike(postId: string, userId: string): Promise<void> {
    try {
      const existingLike = await this.postLikesRepository.findOne({
        where: { post: { id: postId }, user: { id: userId } },
        select: ['id'],
      });

      if (existingLike) {
        await this.postLikesRepository.remove(existingLike);
      } else {
        const newLike = this.postLikesRepository.create({
          post: { id: postId },
          user: { id: userId },
        });
        await this.postLikesRepository.save(newLike);
      }
    } catch (err) {
      this.handlerException.handlerDBException(err);
    }
  }

  async toggleCommentLike(commentId: string, userId: string): Promise<void> {
    try {
      const existingLike = await this.commentLikesRepository.findOne({
        where: { comment: { id: commentId }, user: { id: userId } },
        select: ['id'],
      });

      if (existingLike) {
        await this.commentLikesRepository.remove(existingLike);
      } else {
        const newLike = this.commentLikesRepository.create({
          comment: { id: commentId },
          user: { id: userId },
        });
        await this.commentLikesRepository.save(newLike);
      }
    } catch (err) {
      this.handlerException.handlerDBException(err);
    }
  }
}
