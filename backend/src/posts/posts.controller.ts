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

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  /* ────────  ADMIN / BACKOFFICE  ──────── */
  @Post()
  @Auth(Role.ADMIN)
  create(@Body() createPostDto: CreatePostDto, @GetUser() user: User) {
    return this.postsService.create(createPostDto, user);
  }

  @Get()
  @Auth(Role.ADMIN)
  findAll() {
    return this.postsService.findAll();
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

  /* ────────  PÚBLICO / FRONTEND  ──────── */
  @Get('published/:term')
  findOnePublished(@Param('term') term: string) {
    return this.postsService.findOne(term, { onlyPublished: true });
  }

  @Get('published')
  findAllPublished() {
    return this.postsService.findAllPublished();
  }

  @Get('featured')
  findAllFeatured() {
    return this.postsService.findAllFeatured();
  }

  // @Get('filter')
  // findByFilter(@Query() filterDto: PostsFilterDto) {
  //   return this.postsService.findPosts(filterDto);
  // }
}
