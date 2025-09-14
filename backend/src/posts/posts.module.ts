import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { HandlerException } from '../common/exceptions/handler.exception';
import { AuthModule } from '../auth/auth.module';
import { LikesController } from './likes/likes.controller';
import { LikesService } from './likes/likes.service';
import { PostLike } from './entities/likes.entity';

@Module({
  controllers: [PostsController, LikesController],
  providers: [PostsService, HandlerException, LikesService],
  imports: [AuthModule, TypeOrmModule.forFeature([Post, PostLike])],
  exports: [TypeOrmModule],
})
export class PostsModule {}
