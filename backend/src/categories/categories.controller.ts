import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { ApiTags } from '@nestjs/swagger';
import {
  ApiCreateResponse,
  ApiFindAllFeaturesResponse,
  ApiFindAllResponse,
  ApiFindOneResponse,
  ApiRemoveResponse,
  ApiToggleStatusResponse,
  ApiUpdateResponse,
} from '../swagger/decorators/categories';
import { Role } from '../config';
import { Auth } from '../auth/decorators';
import { ApiFindAllActivesResponse } from '../swagger/decorators/categories/api-find-all-actives.decorator';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  @Auth(Role.ADMIN)
  @ApiCreateResponse()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  @Get()
  @Auth(Role.ADMIN)
  @ApiFindAllResponse()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get('actives')
  @ApiFindAllActivesResponse()
  findAllActives() {
    return this.categoriesService.findAllActives();
  }

  @Get('features')
  @ApiFindAllFeaturesResponse()
  findAllFeatures() {
    return this.categoriesService.findAllFeatures();
  }

  @Get(':id')
  @Auth(Role.ADMIN)
  @ApiFindOneResponse()
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.categoriesService.findOne(id);
  }

  @Patch(':id')
  @Auth(Role.ADMIN)
  @ApiUpdateResponse()
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @Patch(':id/toggle-status')
  @Auth(Role.ADMIN)
  @ApiToggleStatusResponse()
  toggleStatus(@Param('id', ParseUUIDPipe) id: string) {
    return this.categoriesService.toggleStatus(id);
  }

  @Delete(':id')
  @Auth(Role.ADMIN)
  @ApiRemoveResponse()
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.categoriesService.remove(id);
  }
}
