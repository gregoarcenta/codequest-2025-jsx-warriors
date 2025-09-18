import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from '../dto/create-comment.dto';
import { User } from '../../users/entities/user.entity';
import { Auth, GetUser } from '../../auth/decorators';
import { PaginateDto } from '../../common/dto/paginate.dto';
import { UpdateCommentDto } from '../dto/update-comment.dto';
import { Role } from '../../config';
import {
  ApiCreateCommentResponse,
  ApiFindAllPerPostResponse,
  ApiFindOneResponse,
  ApiUpdateResponse,
  ApiToggleVisibilityResponse,
} from '../../swagger/decorators/comments';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get('post/:postId')
  @ApiFindAllPerPostResponse()
  findAllPerPost(
    @Param('postId', ParseUUIDPipe) postId: string,
    @Query() paginateDto: PaginateDto,
  ) {
    return this.commentsService.findAllPerPost(postId, paginateDto);
  }

  @Post(':postId')
  @Auth()
  @ApiCreateCommentResponse()
  createComment(
    @Param('postId', ParseUUIDPipe) postId: string,
    @Body() createCommentDto: CreateCommentDto,
    @GetUser() user: User,
  ) {
    return this.commentsService.createComment(
      postId,
      user.id,
      createCommentDto,
    );
  }

  @Get(':id')
  @Auth()
  @ApiFindOneResponse()
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.commentsService.findOne(id);
  }

  @Patch(':id')
  @Auth()
  @ApiUpdateResponse()
  async updateComment(
    @Param('id') id: string,
    @Body() dto: UpdateCommentDto,
    @GetUser() user: User,
  ) {
    return this.commentsService.updateComment(id, user.id, dto);
  }

  @Patch(':id/visibility')
  @Auth(Role.ADMIN)
  @ApiToggleVisibilityResponse()
  toggleVisibility(@Param('id', ParseUUIDPipe) id: string) {
    return this.commentsService.toggleVisibility(id);
  }
}
