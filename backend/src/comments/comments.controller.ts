import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  ParseUUIDPipe,
  Query,
  Req,
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { OptionalJwtAuthGuard } from '../auth/guards/optional-jwt-auth.guard';
import {
  ApiCreateCommentResponse,
  ApiFindAllPerPostResponse,
  ApiFindOneResponse,
  ApiToggleVisibilityResponse,
  ApiUpdateResponse,
} from '../swagger/decorators/comments';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PaginateDto } from '../common/dto/paginate.dto';
import { Auth, GetUser } from '../auth/decorators';
import { User } from '../users/entities/user.entity';
import { Role } from '../config';
import { Request } from 'express';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get('post/:postId')
  @ApiBearerAuth()
  @UseGuards(OptionalJwtAuthGuard)
  @ApiFindAllPerPostResponse()
  findAllPerPost(
    @Param('postId', ParseUUIDPipe) postId: string,
    @Query() paginateDto: PaginateDto,
    @Req() req: Request,
  ) {
    const user = req.user as User;
    return this.commentsService.findAllPerPost(postId, paginateDto, user?.id);
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
