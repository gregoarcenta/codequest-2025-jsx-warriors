import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { UsersModule } from '../users/users.module';
import { CategoriesModule } from '../categories/categories.module';
import { PostsModule } from '../posts/posts.module';
import { AuthModule } from '../auth/auth.module';
import { CommentsModule } from '../comments/comments.module';

@Module({
  providers: [SeedService],
  imports: [
    AuthModule,
    UsersModule,
    CategoriesModule,
    PostsModule,
    CommentsModule,
  ],
})
export class SeedModule {}
