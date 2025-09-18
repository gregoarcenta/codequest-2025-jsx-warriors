import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  ArrayUnique,
  IsArray,
  IsBoolean,
  IsEnum,
  IsOptional,
} from 'class-validator';
import { UpdateUserDto } from './update-user.dto';
import { Role } from '../../config';

export class UpdateUserByAdminDto extends UpdateUserDto {
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
