import { ApiProperty } from '@nestjs/swagger';

export class UploadImageResponse {
  @ApiProperty({
    description: 'UploadImageResponse imageUrl',
    format: 'uri',
    example:
      'https://res.cloudinary.com/dksluyb9v/image/upload/v1757547533/avatars/eursl3il6fj02bmd85hd.jpg',
  })
  imageUrl: string;

  @ApiProperty({
    description: 'UploadImageResponse publicId',
    example: 'eursl3il6fj02bmd85hd',
  })
  publicId: string;

  @ApiProperty({ description: 'UploadImageResponse format', example: 'jpg' })
  format: string;
}
