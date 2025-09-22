import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { HandlerException } from '../common/exceptions/handler.exception';
import { AuthModule } from '../auth/auth.module';
import { PostViewLog } from './entities/post-view-log.entity';
import { PostViewLogCleanupService } from './services/post-view-log-cleanup.service';

@Module({
  controllers: [PostsController],
  providers: [PostsService, HandlerException, PostViewLogCleanupService],
  imports: [AuthModule, TypeOrmModule.forFeature([Post, PostViewLog])],
  exports: [TypeOrmModule, PostsService],
})
export class PostsModule {}
