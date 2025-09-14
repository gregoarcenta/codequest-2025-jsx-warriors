import {
  BadRequestException,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { HandlerException } from '../common/exceptions/handler.exception';
import { categoriesInitialData } from '../data/categories.data';

@Injectable()
export class CategoriesService implements OnModuleInit {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
    private readonly handlerException: HandlerException,
  ) {}

  async onModuleInit() {
    try {
      const count = await this.categoryRepository.count();
      if (count === 0) {
        await this.categoryRepository.save(categoriesInitialData);
        console.log('Categorías base creadas');
      }
    } catch (err) {
      this.handlerException.handlerDBException(err);
    }
  }

  async create(createCategoryDto: CreateCategoryDto) {
    const category = this.categoryRepository.create(createCategoryDto);

    try {
      return await this.categoryRepository.save(category);
    } catch (err) {
      if (err.code === '23505') {
        throw new BadRequestException('The category already exists');
      }
      this.handlerException.handlerDBException(err);
    }
  }

  async findAll(options?: { onlyActive?: boolean; onlyFeatured?: boolean }) {
    try {
      const queryBuilder =
        this.categoryRepository.createQueryBuilder('category');

      if (options?.onlyActive) {
        queryBuilder.where('category.is_active = :isActive', {
          isActive: true,
        });
      }

      if (options?.onlyFeatured) {
        queryBuilder
          .where('category.is_active = :isActive', { isActive: true })
          .andWhere('category.is_featured = :isFeatured', { isFeatured: true });
      }

      return await queryBuilder.getMany();
    } catch (err) {
      this.handlerException.handlerDBException(err);
    }
  }

  async findOne(id: string): Promise<Category> {
    let category: Category = null;
    try {
      category = await this.categoryRepository.findOneBy({ id });
    } catch (err) {
      this.handlerException.handlerDBException(err);
    }

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    let category: Category = null;
    try {
      category = await this.categoryRepository.preload({
        id,
        ...updateCategoryDto,
      });
    } catch (err) {
      this.handlerException.handlerDBException(err);
    }

    if (!category) throw new NotFoundException('Category not found');

    try {
      await this.categoryRepository.save(category);
    } catch (err) {
      if (err.code === '23505') {
        throw new BadRequestException('The category name already exists');
      }
      this.handlerException.handlerDBException(err);
    }

    return { message: `Category ${category.name} updated successfully` };
  }

  async toggleStatus(id: string) {
    const category = await this.findOne(id);

    try {
      category.isActive = !category.isActive;
      await this.categoryRepository.save(category);
      return {
        message: `Category ${category.name} ${category.isActive ? 'activated' : 'deactivated'} successfully`,
      };
    } catch (err) {
      this.handlerException.handlerDBException(err);
    }
  }

  async remove(id: string) {
    const category = await this.findOne(id);
    try {
      await this.categoryRepository.delete(id);
      return { message: `Category ${category.name} deleted successfully` };
    } catch (err) {
      this.handlerException.handlerDBException(err);
    }
  }
}
