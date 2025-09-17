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
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth, GetUser } from '../auth/decorators';
import { User } from './entities/user.entity';
import { Role } from '../config';
import { PaginateDto } from '../common/dto/paginate.dto';
import { UpdateUserByAdminDto } from './dto/update-user-by-admin.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /* ────────  SOLO AUTH  ──────── */

  // @Get('me/profile')
  // @Auth()
  // profile(@GetUser() user: User) {
  //   return this.usersService.getProfile(user);
  // }

  @Patch('me')
  @Auth()
  update(@Body() updateUserDto: UpdateUserDto, @GetUser() user: User) {
    return this.usersService.update(user, updateUserDto);
  }

  @Patch('me/password')
  @Auth()
  updatePassword(
    @Body() updatePasswordDto: UpdatePasswordDto,
    @GetUser() user: User,
  ) {
    return this.usersService.updatePassword(user, updatePasswordDto);
  }

  @Get('me/bookmarks')
  @Auth()
  findBookmarks(@Query() paginateDto: PaginateDto, @GetUser() user: User) {
    return this.usersService.findBookmarks(user, paginateDto);
  }

  @Post('me/bookmarks/:postId')
  @Auth()
  toggleBookmark(
    @Param('postId', ParseUUIDPipe) postId: string,
    @GetUser() user: User,
  ) {
    return this.usersService.toggleBookmark(postId, user.id);
  }

  /* ────────  ADMIN / BACKOFFICE  ──────── */
  @Get()
  @Auth(Role.ADMIN)
  findAll(@Query() paginateDto: PaginateDto) {
    return this.usersService.findAll(paginateDto);
  }

  @Get(':id')
  @Auth(Role.ADMIN)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @Auth(Role.ADMIN)
  updateByAdmin(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserByAdminDto: UpdateUserByAdminDto,
  ) {
    return this.usersService.updateByAdmin(id, updateUserByAdminDto);
  }
}
