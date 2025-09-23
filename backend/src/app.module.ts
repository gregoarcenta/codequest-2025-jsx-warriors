import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { AuthModule } from './auth/auth.module';
import { validationSchema } from './config';
import { UploadModule } from './upload/upload.module';
import { CategoriesModule } from './categories/categories.module';
import { PostsModule } from './posts/posts.module';
import typeorm from './config/typeorm.config';
import { UsersModule } from './users/users.module';
import { CommentsModule } from './comments/comments.module';
import { LikesModule } from './likes/likes.module';
import { DatabaseModule } from './database/database.module';
import { SeedModule } from './seed/seed.module';
import { ContactModule } from './contact/contact.module';

@Module({
  imports: [
    ConfigModule.forRoot({ validationSchema, isGlobal: true, load: [typeorm] }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    ScheduleModule.forRoot(),
    DatabaseModule,
    AuthModule,
    UsersModule,
    CategoriesModule,
    PostsModule,
    CommentsModule,
    LikesModule,
    UploadModule,
    SeedModule,
    ContactModule,
  ],
})
export class AppModule {}
