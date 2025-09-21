import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ParseUUIDPipe,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Auth, GetUser } from '../auth/decorators';
import { Role } from '../config';
import { User } from '../users/entities/user.entity';
import { PostStatus } from './enums/post-status';
import { PostsFilterDto } from './dto/filter.dto';
import { PaginateDto } from '../common/dto/paginate.dto';
import {
  ApiArchivePostResponse,
  ApiCreateResponse,
  ApiDraftPostResponse,
  ApiFindAllFeaturedResponse,
  ApiFindAllPublishedResponse,
  ApiFindAllRelatedResponse,
  ApiFindAllResponse,
  ApiFindOnePublishedResponse,
  ApiFindOneResponse,
  ApiPublishPostResponse,
  ApiUpdateResponse,
} from '../swagger/decorators/posts';
import { Request } from 'express';
import { OptionalJwtAuthGuard } from '../auth/guards/optional-jwt-auth.guard';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  /* ────────  PÚBLICO / FRONTEND  ──────── */
  @Get('featured')
  @ApiBearerAuth()
  @UseGuards(OptionalJwtAuthGuard)
  @ApiFindAllFeaturedResponse()
  findAllFeatured(@Query() paginateDto: PaginateDto, @Req() req: Request) {
    const user = req.user as User;
    return this.postsService.findAllFeatured(paginateDto, user?.id);
  }

  @Get('published')
  @ApiBearerAuth()
  @UseGuards(OptionalJwtAuthGuard)
  @ApiFindAllPublishedResponse()
  findAllPublished(@Query() filterDto: PostsFilterDto, @Req() req: Request) {
    const user = req.user as User;
    return this.postsService.findAll(filterDto, user?.id, {
      onlyPublished: true,
    });
  }

  @Get('published/:term')
  @ApiBearerAuth()
  @UseGuards(OptionalJwtAuthGuard)
  @ApiFindOnePublishedResponse()
  findOnePublished(@Param('term') term: string, @Req() req: Request) {
    const user = req.user as User;
    const ip = req.ip;
    console.log('ip: ', { ip });
    return this.postsService.findOne(term, user?.id, {
      onlyPublished: true,
      ip,
    });
  }

  @Get('related/:postId')
  @ApiFindAllRelatedResponse()
  findRelated(@Param('postId') postId: string) {
    return this.postsService.findRelated(postId);
  }

  /* ────────  ADMIN / BACKOFFICE  ──────── */
  @Post()
  @Auth(Role.ADMIN)
  @ApiCreateResponse()
  create(@Body() createPostDto: CreatePostDto, @GetUser() user: User) {
    return this.postsService.create(createPostDto, user);
  }

  @Get()
  @Auth(Role.ADMIN)
  @ApiFindAllResponse()
  findAll(@Query() filterDto: PostsFilterDto, @GetUser() user: User) {
    return this.postsService.findAll(filterDto, user.id);
  }

  @Get(':term')
  @Auth(Role.ADMIN)
  @ApiFindOneResponse()
  findOne(
    @Param('term') term: string,
    @GetUser() user: User,
    @Req() req: Request,
  ) {
    const ip = req.ip;
    return this.postsService.findOne(term, user.id, { ip });
  }

  @Patch(':id')
  @Auth(Role.ADMIN)
  @ApiUpdateResponse()
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postsService.update(id, updatePostDto);
  }

  @Patch(':id/publish')
  @Auth(Role.ADMIN)
  @ApiPublishPostResponse()
  publishPost(@Param('id', ParseUUIDPipe) id: string) {
    return this.postsService.updatePostStatus(id, PostStatus.PUBLISHED);
  }

  @Patch(':id/archive')
  @Auth(Role.ADMIN)
  @ApiArchivePostResponse()
  archivePost(@Param('id', ParseUUIDPipe) id: string) {
    return this.postsService.updatePostStatus(id, PostStatus.ARCHIVED);
  }

  @Patch(':id/draft')
  @Auth(Role.ADMIN)
  @ApiDraftPostResponse()
  draftPost(@Param('id', ParseUUIDPipe) id: string) {
    return this.postsService.updatePostStatus(id, PostStatus.DRAFT);
  }
}
