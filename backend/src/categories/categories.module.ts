import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { HandlerException } from '../common/exceptions/handler.exception';

@Module({
  controllers: [CategoriesController],
  providers: [CategoriesService, HandlerException],
  imports: [TypeOrmModule.forFeature([Category])],
  exports: [TypeOrmModule],
})
export class CategoriesModule {}
