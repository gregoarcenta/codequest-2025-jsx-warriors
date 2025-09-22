import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comment } from './entities/comment.entity';
import { PostsModule } from '../posts/posts.module';
import { HandlerException } from '../common/exceptions/handler.exception';

@Module({
  controllers: [CommentsController],
  providers: [CommentsService, HandlerException],
  imports: [AuthModule, PostsModule, TypeOrmModule.forFeature([Comment])],
  exports: [TypeOrmModule],
})
export class CommentsModule {}
