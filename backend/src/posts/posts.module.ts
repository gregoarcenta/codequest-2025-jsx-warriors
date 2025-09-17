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
import { PostViewLog } from './entities/post-view-log.entity';
import { Comment } from './entities/comment.entity';
import { PostViewLogCleanupService } from './services/post-view-log-cleanup.service';
import { CommentsController } from './comments/comments.controller';
import { CommentsService } from './comments/comments.service';

@Module({
  controllers: [PostsController, CommentsController, LikesController],
  providers: [
    PostsService,
    HandlerException,
    LikesService,
    PostViewLogCleanupService,
    CommentsService,
  ],
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Post, PostLike, PostViewLog, Comment]),
  ],
  exports: [TypeOrmModule],
})
export class PostsModule {}
