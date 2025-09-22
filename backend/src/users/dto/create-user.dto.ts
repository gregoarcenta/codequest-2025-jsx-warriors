import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsBoolean,
  IsEnum,
  IsOptional,
  IsString,
  IsUrl,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from '../../config';
import { SignUpDto } from '../../auth/dto/sign-up.dto';

export class CreateUserDto extends SignUpDto {
  @ApiPropertyOptional({
    description: 'User avatar URL',
    example: 'https://example.com/avatar.jpg',
  })
  @IsString()
  @IsOptional()
  @IsUrl()
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

  @ApiPropertyOptional({
    description: 'User is active',
    example: 'false',
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiPropertyOptional({
    description: 'User roles',
    example: ['user', 'admin'],
  })
  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @ArrayNotEmpty()
  @IsEnum(Role, { each: true })
  roles?: Role[];
}
