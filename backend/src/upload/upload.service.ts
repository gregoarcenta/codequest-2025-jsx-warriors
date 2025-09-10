import {
  Injectable,
  InternalServerErrorException,
  Logger,
  UploadedFile,
} from '@nestjs/common';
import { CloudinaryService } from './cloudinary/cloudinary.service';

@Injectable()
export class UploadService {
  private readonly logger = new Logger(UploadedFile.name);

  constructor(private readonly cloudinaryService: CloudinaryService) {}

  async uploadPostImage(file: Express.Multer.File) {
    try {
      return await this.cloudinaryService.uploadImage(file, 'posts');
    } catch (err) {
      this.logger.error(err.message);
      throw new InternalServerErrorException('Cannot upload image');
    }
  }

  async uploadAvatarImage(file: Express.Multer.File) {
    try {
      return await this.cloudinaryService.uploadImage(file, 'avatars');
    } catch (err) {
      this.logger.error(err.message);
      throw new InternalServerErrorException('Cannot upload image');
    }
  }
}
