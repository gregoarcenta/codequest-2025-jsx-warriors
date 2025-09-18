import { Type } from 'class-transformer';
import { IsInt, IsNumber, IsOptional, IsPositive } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class PaginateDto {
  @ApiPropertyOptional({ description: 'Number page', example: '1' })
  @IsOptional()
  @IsNumber()
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  page?: number = 1;

  @ApiPropertyOptional({ description: 'Posts per page', example: '10' })
  @IsOptional()
  @IsNumber()
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  limit?: number = 10;
}
