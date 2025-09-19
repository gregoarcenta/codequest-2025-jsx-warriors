import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikesController } from './likes.controller';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HandlerException } from '../common/exceptions/handler.exception';
import { PostLike } from './entities/postLike.entity';
import { CommentLike } from './entities/commentLike.entity';

@Module({
  controllers: [LikesController],
  providers: [LikesService, HandlerException],
  imports: [AuthModule, TypeOrmModule.forFeature([PostLike, CommentLike])],
  exports: [TypeOrmModule],
})
export class LikesModule {}
