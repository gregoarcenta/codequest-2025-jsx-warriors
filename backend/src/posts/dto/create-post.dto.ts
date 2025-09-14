import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsUUID,
  Length,
  IsUrl,
  IsBoolean,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreatePostDto {
  @ApiProperty({
    description: 'Post title',
    example: 'Post title',
    uniqueItems: true,
    minLength: 3,
    maxLength: 150,
  })
  @IsString()
  @Length(3, 150)
  @Transform(({ value }) => value.trim())
  title: string;

  @ApiPropertyOptional({
    description: 'Post content',
    example: 'This is a post content',
  })
  @IsString()
  @IsOptional()
  content?: string;

  @ApiPropertyOptional({
    description: 'Post cover image URL',
    example: 'https://example.com/cover.jpg',
  })
  @IsString()
  @IsUrl()
  @IsOptional()
  coverImageUrl?: string;

  @ApiPropertyOptional({
    description: 'Post featured status',
    example: false,
  })
  @IsBoolean()
  @IsOptional()
  isFeatured?: boolean;

  @ApiPropertyOptional({
    description: 'Category ID',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsUUID()
  @IsOptional()
  categoryId?: string;
}
