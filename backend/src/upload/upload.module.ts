import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { CloudinaryProvider } from '../config';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [UploadController],
  providers: [UploadService, CloudinaryService, CloudinaryProvider.config()],
  imports: [AuthModule],
})
export class UploadModule {}
