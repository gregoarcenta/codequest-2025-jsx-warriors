import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { HandlerException } from '../common/exceptions/handler.exception';
import { AuthModule } from '../auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bookmark } from './entities/bookmark.entity';

@Module({
  controllers: [UsersController],
  providers: [UsersService, HandlerException],
  imports: [AuthModule, TypeOrmModule.forFeature([Bookmark])],
  exports: [TypeOrmModule],
})
export class UsersModule {}
