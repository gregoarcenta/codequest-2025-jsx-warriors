import { IsOptional, IsString, IsEnum, IsUUID } from 'class-validator';
import { SortBy } from '../enums/sort-by';
import { Transform } from 'class-transformer';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginateDto } from '../../common/dto/paginate.dto';

export class PostsFilterDto extends PaginateDto {
  @ApiPropertyOptional({ description: 'Post title', example: 'Post title' })
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value.trim())
  title?: string;

  @ApiPropertyOptional({
    description: 'Category ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsUUID()
  categoryId?: string;

  @ApiPropertyOptional({
    description: 'Author ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsUUID()
  authorId?: string;

  @ApiPropertyOptional({
    description: 'Sort by',
    example: 'recent',
    enum: SortBy,
  })
  @IsOptional()
  @IsEnum(SortBy)
  sortBy?: SortBy = SortBy.RECENT;
}
