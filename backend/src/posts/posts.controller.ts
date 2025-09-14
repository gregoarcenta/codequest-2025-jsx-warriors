import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  ParseUUIDPipe,
  Query,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth, GetUser } from '../auth/decorators';
import { Role } from '../config';
import { User } from '../auth/entities/user.entity';
import { PostStatus } from './enums/post-status';
import { PostsFilterDto } from './dto/filter.dto';
import { PaginateDto } from '../common/dto/paginate.dto';
import {
  ApiArchivePostResponse,
  ApiCreateResponse,
  ApiDraftPostResponse,
  ApiFindAllFeaturedResponse,
  ApiFindAllPublishedResponse,
  ApiFindAllResponse,
  ApiFindOnePublishedResponse,
  ApiFindOneResponse,
  ApiPublishPostResponse,
  ApiUpdateResponse,
} from '../swagger/decorators/posts';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  /* ────────  PÚBLICO / FRONTEND  ──────── */
  @Get('featured')
  @ApiFindAllFeaturedResponse()
  findAllFeatured(@Query() paginateDto: PaginateDto) {
    return this.postsService.findAllFeatured(paginateDto);
  }

  @Get('published')
  @ApiFindAllPublishedResponse()
  findAllPublished(@Query() filterDto: PostsFilterDto) {
    return this.postsService.findAll(filterDto, { onlyPublished: true });
  }

  @Get('published/:term')
  @ApiFindOnePublishedResponse()
  findOnePublished(@Param('term') term: string) {
    return this.postsService.findOne(term, { onlyPublished: true });
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
  findAll(@Query() filterDto: PostsFilterDto) {
    return this.postsService.findAll(filterDto);
  }

  @Get(':term')
  @Auth(Role.ADMIN)
  @ApiFindOneResponse()
  findOne(@Param('term') term: string) {
    return this.postsService.findOne(term);
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
