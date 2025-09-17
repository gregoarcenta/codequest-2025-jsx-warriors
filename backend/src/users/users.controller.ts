import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { Auth, GetUser } from '../auth/decorators';
import { User } from './entities/user.entity';
import { Role } from '../config';
import { PaginateDto } from '../common/dto/paginate.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  /* ────────  SOLO AUTH  ──────── */
  @Patch()
  @Auth()
  update(@Body() updateUserDto: UpdateUserDto, @GetUser() user: User) {
    return this.usersService.update(user, updateUserDto);
  }
  /* ────────  ADMIN / BACKOFFICE  ──────── */

  @Get()
  @Auth(Role.ADMIN)
  findAll(@Query() paginateDto: PaginateDto) {
    return this.usersService.findAll(paginateDto);
  }
}
