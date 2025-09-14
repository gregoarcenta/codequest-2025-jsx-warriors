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

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  /* ────────  PÚBLICO / FRONTEND  ──────── */
  @Get('featured')
  findAllFeatured(@Query() paginateDto: PaginateDto) {
    return this.postsService.findAllFeatured(paginateDto);
  }

  @Get('published')
  findAllPublished(@Query() filterDto: PostsFilterDto) {
    return this.postsService.findAll(filterDto, { onlyPublished: true });
  }

  @Get('published/:term')
  findOnePublished(@Param('term') term: string) {
    return this.postsService.findOne(term, { onlyPublished: true });
  }

  /* ────────  ADMIN / BACKOFFICE  ──────── */
  @Post()
  @Auth(Role.ADMIN)
  create(@Body() createPostDto: CreatePostDto, @GetUser() user: User) {
    return this.postsService.create(createPostDto, user);
  }

  @Get()
  @Auth(Role.ADMIN)
  findAll(@Query() filterDto: PostsFilterDto) {
    return this.postsService.findAll(filterDto);
  }

  @Get(':term')
  @Auth(Role.ADMIN)
  findOne(@Param('term') term: string) {
    return this.postsService.findOne(term);
  }

  @Patch(':id')
  @Auth(Role.ADMIN)
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postsService.update(id, updatePostDto);
  }

  @Patch(':id/publish')
  @Auth(Role.ADMIN)
  publishPost(@Param('id', ParseUUIDPipe) id: string) {
    return this.postsService.updatePostStatus(id, PostStatus.PUBLISHED);
  }

  @Patch(':id/archive')
  @Auth(Role.ADMIN)
  archivePost(@Param('id', ParseUUIDPipe) id: string) {
    return this.postsService.updatePostStatus(id, PostStatus.ARCHIVED);
  }

  @Patch(':id/draft')
  @Auth(Role.ADMIN)
  draftPost(@Param('id', ParseUUIDPipe) id: string) {
    return this.postsService.updatePostStatus(id, PostStatus.DRAFT);
  }
}
