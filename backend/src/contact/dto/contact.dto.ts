import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  MaxLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class ContactDto {
  @ApiProperty({
    description: 'Nombre completo del usuario',
    example: 'Gregory Arcentales',
  })
  @IsString()
  @Length(3, 100)
  @Transform(({ value }) => value.trim())
  name: string;

  @ApiProperty({
    description: 'Correo electrónico de contacto',
    example: 'test@test.com',
  })
  @IsEmail()
  @IsString()
  @Transform(({ value }) => value.trim())
  email: string;

  @ApiPropertyOptional({
    description: 'Nombre de la empresa u organización',
    example: 'Mi Empresa',
  })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  company?: string;

  @ApiPropertyOptional({
    description: 'Teléfono de contacto',
    example: '+1 (555) 123-4567',
  })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone?: string;

  @ApiProperty({
    description: 'Asunto del mensaje',
    example: 'Consulta sobre servicios',
  })
  @IsString()
  @Length(3, 150)
  @Transform(({ value }) => value.trim())
  subject: string;

  @ApiProperty({
    description: 'Mensaje del usuario',
    example: 'Hola, me interesa su servicio...',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(300)
  message: string;
}
