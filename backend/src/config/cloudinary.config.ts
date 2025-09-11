import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryProvider {
  private static cloudinaryConfigFactory() {
    return cloudinary.config({
      cloud_name: process.env.CLOUDINARY_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  static config() {
    return {
      provide: 'CLOUDINARY',
      useFactory: this.cloudinaryConfigFactory,
    };
  }
}
