import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class ForgotPasswordDto {
  @ApiProperty({
    description: 'Forgot password - email',
    example: 'test@test.com',
  })
  @IsEmail()
  email: string;
}