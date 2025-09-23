import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SubscribeDto {
  @ApiProperty({
    description: 'Email address to subscribe',
    example: 'alex.a@example.com',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
