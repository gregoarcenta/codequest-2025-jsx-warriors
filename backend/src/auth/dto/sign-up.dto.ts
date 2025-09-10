import {
  IsEmail,
  IsLowercase,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpDto {
  @ApiProperty({ description: 'SignUp fullName', example: 'User Full Name' })
  @IsString()
  @MinLength(3)
  @Transform(({ value }) => value.toLowerCase().trim())
  fullName: string;

  @ApiProperty({ description: 'SignUp email', example: 'test@test.com' })
  @IsString()
  @IsEmail()
  @IsLowercase()
  email: string;

  @ApiProperty({ description: 'SignUp password', example: 'Test123' })
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 0,
  })
  @Transform(({ value }) => value.trim())
  password: string;
}
