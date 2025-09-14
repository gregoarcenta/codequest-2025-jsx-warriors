import {
  Controller,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth, GetUser } from '../../auth/decorators';
import { LikesService } from './likes.service';
import { User } from '../../auth/entities/user.entity';

@ApiTags('Likes')
@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post(':postId')
  @Auth()
  @HttpCode(204)
  toggleLike(
    @Param('postId', ParseUUIDPipe) postId: string,
    @GetUser() user: User,
  ) {
    return this.likesService.toggleLike(postId, user.id);
  }
}
