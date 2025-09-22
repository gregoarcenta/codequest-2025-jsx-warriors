import {
  Controller,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Auth, GetUser } from '../auth/decorators';
import { LikesService } from './likes.service';
import { User } from '../users/entities/user.entity';
import {
  ApiTogglePostLikeResponse,
  ApiToggleCommentLikeResponse,
} from '../swagger/decorators/likes';

@ApiTags('Likes')
@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Post('post/:postId')
  @Auth()
  @HttpCode(204)
  @ApiTogglePostLikeResponse()
  togglePostLike(
    @Param('postId', ParseUUIDPipe) postId: string,
    @GetUser() user: User,
  ) {
    return this.likesService.togglePostLike(postId, user.id);
  }

  @Post('comment/:commentId')
  @Auth()
  @HttpCode(204)
  @ApiToggleCommentLikeResponse()
  toggleCommentLike(
    @Param('commentId', ParseUUIDPipe) commentId: string,
    @GetUser() user: User,
  ) {
    return this.likesService.toggleCommentLike(commentId, user.id);
  }
}
