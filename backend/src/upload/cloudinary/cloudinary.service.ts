import { Injectable } from '@nestjs/common';

import {
  UploadApiErrorResponse,
  UploadApiResponse,
  v2 as cloudinary,
} from 'cloudinary';

// eslint-disable-next-line @typescript-eslint/no-require-imports
import toStream = require('buffer-to-stream');
import { UploadImageResponse } from '../interfaces/upload-image.response';

type FolderImage = 'posts' | 'avatars';

@Injectable()
export class CloudinaryService {
  async uploadImage(
    file: Express.Multer.File,
    folder: FolderImage,
  ): Promise<UploadImageResponse> {
    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        { folder },
        (error: UploadApiErrorResponse, result: UploadApiResponse) => {
          if (error) return reject(error);
          resolve({
            imageUrl: result.secure_url,
            publicId: result.public_id,
            format: result.format,
          });
        },
      );
      toStream(file.buffer).pipe(upload);
    });
  }
}
