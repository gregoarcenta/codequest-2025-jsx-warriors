import {
  Controller,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { ApiUploadImageResponse } from '../swagger/decorators/upload/api-upload-image.decorator';
import { Auth } from '../auth/decorators';
import { Role } from '../config';

@ApiTags('Upload')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('post')
  @Auth(Role.ADMIN)
  @UseInterceptors(FileInterceptor('image'))
  @ApiUploadImageResponse()
  uploadPostImage(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: 'image/jpeg|jpg|png|gif' })
        .addMaxSizeValidator({ maxSize: 250000 })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    )
    file: Express.Multer.File,
  ) {
    return this.uploadService.uploadPostImage(file);
  }

  @Post('avatar')
  @Auth()
  @UseInterceptors(FileInterceptor('image'))
  @ApiUploadImageResponse()
  uploadAvatarImage(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({ fileType: 'image/jpeg|jpg|png|gif' })
        .addMaxSizeValidator({ maxSize: 250000 })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    )
    file: Express.Multer.File,
  ) {
    return this.uploadService.uploadAvatarImage(file);
  }
}
