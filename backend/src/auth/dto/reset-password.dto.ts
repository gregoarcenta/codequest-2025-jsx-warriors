import { ApiProperty } from '@nestjs/swagger';
import { IsJWT, IsStrongPassword } from 'class-validator';
import { Transform } from 'class-transformer';

export class ResetPasswordDto {
    @ApiProperty({
        description: 'Token JWT recibido en el correo de recuperación',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    })
    @IsJWT()
    token!: string;

    @ApiProperty({
        description: 'Nueva contraseña segura',
        example: 'Test1234',
    })
    @IsStrongPassword({
        minLength: 6,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 0,
    })
    @Transform(({ value }) => value.trim())
    password!: string;
}
