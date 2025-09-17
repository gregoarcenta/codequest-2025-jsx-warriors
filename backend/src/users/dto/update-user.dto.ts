import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsLowercase,
  IsOptional,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateUserDto {
  @ApiPropertyOptional({
    description: 'User full name',
    example: 'Alex Arcentales',
  })
  @IsString()
  @IsOptional()
  @MinLength(3)
  @Transform(({ value }) => value.toLowerCase().trim())
  fullName?: string;

  @ApiPropertyOptional({
    description: 'User email',
    example: 'alex@correo.com',
  })
  @IsString()
  @IsEmail()
  @IsOptional()
  @IsLowercase()
  email?: string;

  @ApiPropertyOptional({
    description: 'User avatar URL',
    example: 'https://example.com/avatar.jpg',
  })
  @IsUrl()
  @IsString()
  @IsOptional()
  avatarUrl?: string;

  @ApiPropertyOptional({
    description: 'User bio',
    example: 'Hola, soy un desarrollador full stack',
  })
  @IsString()
  @MinLength(10)
  @IsOptional()
  @Transform(({ value }) => value.trim())
  bio?: string;
}
