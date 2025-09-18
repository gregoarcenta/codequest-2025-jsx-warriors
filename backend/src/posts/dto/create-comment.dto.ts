import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, IsUUID, Length } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateCommentDto {
  @ApiProperty({
    description: 'Post content',
    example: 'This is a comment content',
  })
  @IsString()
  @Length(1, 5000)
  @Transform(({ value }) => value.trim())
  content: string;

  @ApiPropertyOptional({
    description:
      'Si se envía, el comentario será una respuesta (hijo) de este parent',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsOptional()
  @IsUUID()
  parentId?: string;
}
