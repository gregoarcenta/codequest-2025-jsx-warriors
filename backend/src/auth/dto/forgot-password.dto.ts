import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

export class ForgotPasswordDto {
    @ApiProperty({ description: 'SignIn email', example: 'test@test.com' })
    @IsEmail()
    email: string;
}