import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { validationSchema } from './config';
import { UploadModule } from './upload/upload.module';
import { CategoriesModule } from './categories/categories.module';
import typeorm from './config/typeorm.config';

@Module({
  imports: [
    ConfigModule.forRoot({ validationSchema, isGlobal: true, load: [typeorm] }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    AuthModule,
    UploadModule,
    CategoriesModule,
  ],
})
export class AppModule {}
