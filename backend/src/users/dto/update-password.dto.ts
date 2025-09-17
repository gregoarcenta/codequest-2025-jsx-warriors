import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsStrongPassword, Length } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdatePasswordDto {
  @ApiProperty({ example: 'OldPass123!' })
  @IsString()
  @Length(6, 64)
  oldPassword: string;

  @ApiProperty({ example: 'NewPass456!' })
  @IsStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 0,
  })
  @Transform(({ value }) => value.trim())
  newPassword: string;
}
