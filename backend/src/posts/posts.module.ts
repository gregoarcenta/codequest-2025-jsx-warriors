import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity';
import { HandlerException } from '../common/exceptions/handler.exception';

@Module({
  controllers: [PostsController],
  providers: [PostsService, HandlerException],
  imports: [TypeOrmModule.forFeature([Post])],
  exports: [TypeOrmModule],
})
export class PostsModule {}
