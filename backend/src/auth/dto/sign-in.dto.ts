import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsLowercase,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class SignInDto {
  @ApiProperty({ description: 'SignIn email', example: 'test@test.com' })
  @IsString()
  @IsEmail()
  @IsLowercase()
  email: string;

  @ApiProperty({ description: 'SignIn password', example: 'Test123' })
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
