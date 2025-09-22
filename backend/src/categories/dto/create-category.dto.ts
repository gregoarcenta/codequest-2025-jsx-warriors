import {
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  IsBoolean,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateCategoryDto {
  @ApiProperty({
    description: 'Category name',
    example: 'Frontend',
  })
  @IsNotEmpty()
  @IsString()
  @Length(2, 50)
  @Transform(({ value }) => value.trim())
  name: string;

  @ApiPropertyOptional({
    description: 'Category description',
    example: 'React, Vue, Angular y más tecnologías frontend',
  })
  @IsString()
  @Length(2, 254)
  @IsOptional()
  @Transform(({ value }) => value.trim())
  description?: string;

  @ApiPropertyOptional({
    description: 'Category featured status',
    example: false,
  })
  @IsBoolean()
  @IsOptional()
  isFeatured?: boolean;
}
