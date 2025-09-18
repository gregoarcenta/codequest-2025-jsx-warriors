import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostLike } from '../entities/likes.entity';
import { Repository } from 'typeorm';
import { HandlerException } from '../../common/exceptions/handler.exception';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(PostLike)
    private likesRepository: Repository<PostLike>,
    private readonly handlerException: HandlerException,
  ) {}

  async toggleLike(postId: string, userId: string) {
    try {
      const existingLike = await this.likesRepository.findOneBy({
        post: { id: postId },
        user: { id: userId },
      });

      if (existingLike) {
        await this.likesRepository.remove(existingLike);
      } else {
        const newLike = this.likesRepository.create({
          post: { id: postId },
          user: { id: userId },
        });
        await this.likesRepository.save(newLike);
      }
    } catch (err) {
      this.handlerException.handlerDBException(err);
    }
  }
}
