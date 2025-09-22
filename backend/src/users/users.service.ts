import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HandlerException } from '../common/exceptions/handler.exception';
import { User } from './entities/user.entity';
import { PaginateDto } from '../common/dto/paginate.dto';
import { UpdateUserByAdminDto } from './dto/update-user-by-admin.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import * as bcrypt from 'bcrypt';
import { Bookmark } from './entities/bookmark.entity';
import { PostStatus } from '../posts/enums/post-status';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(Bookmark)
    private readonly bookmarksRepository: Repository<Bookmark>,
    private readonly handlerException: HandlerException,
    private readonly authService: AuthService,
  ) {}

  private async executeQuery<T>(operation: () => Promise<T>): Promise<T> {
    try {
      return await operation();
    } catch (err) {
      return this.handlerException.handlerDBException(err);
    }
  }

  private calculatePagination(page: number, limit: number) {
    return {
      skip: (page - 1) * limit,
      take: limit,
    };
  }

  async findAll(paginateDto: PaginateDto) {
    const { page, limit } = paginateDto;
    const { skip, take } = this.calculatePagination(page, limit);
    const [users, total] = await this.executeQuery(async () =>
      this.usersRepository
        .createQueryBuilder('user')
        .loadRelationCountAndMap('user.likesCount', 'user.likes')
        .loadRelationCountAndMap('user.postsCount', 'user.posts')
        .skip(skip)
        .take(take)
        .getManyAndCount(),
    );
    return {
      users,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    };
  }

  async findOne(id: string) {
    const user = await this.executeQuery(async () => {
      return await this.usersRepository
        .createQueryBuilder('user')
        .loadRelationCountAndMap('user.likesCount', 'user.likes')
        .loadRelationCountAndMap('user.postsCount', 'user.posts')
        .where('user.id = :id', { id })
        .getOne();
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async updateByAdmin(id: string, updateUserDto: UpdateUserByAdminDto) {
    if (!updateUserDto || Object.keys(updateUserDto).length === 0) {
      return { message: 'No changes to apply' };
    }

    const user = await this.findOne(id);

    await this.executeQuery(async () =>
      this.usersRepository.update(user.id, updateUserDto),
    );

    return { message: `User ${user.fullName} updated successfully` };
  }

  async update(user: User, updateUserDto: UpdateUserDto) {
    if (!updateUserDto || Object.keys(updateUserDto).length === 0) {
      return { message: 'No changes to apply' };
    }

    await this.executeQuery(async () =>
      this.usersRepository.update(user.id, updateUserDto),
    );
    return { message: `User ${user.fullName} updated successfully` };
  }

  async createUserByAdmin(createUserDto: CreateUserDto) {
    return this.authService.signUp(createUserDto);
  }

  async updatePassword(user: User, updatePasswordDto: UpdatePasswordDto) {
    const { oldPassword, newPassword } = updatePasswordDto;

    const userFound = await this.executeQuery(async () => {
      return this.usersRepository
        .createQueryBuilder('user')
        .select('user.password')
        .where('user.id = :id', { id: user.id })
        .getOne();
    });

    const isOldValid = await bcrypt.compare(oldPassword, userFound.password);

    if (!isOldValid) {
      throw new UnauthorizedException('The old password is not valid');
    }

    if (newPassword === oldPassword) {
      throw new UnauthorizedException(
        'The new password cannot be the same as the old password',
      );
    }

    user.password = await bcrypt.hash(newPassword, 10);

    await this.executeQuery(async () => this.usersRepository.save(user));

    return {
      message: `User ${user.fullName} password updated successfully`,
    };
  }

  async findBookmarks(user: User, paginateDto: PaginateDto) {
    const { page, limit } = paginateDto;
    const { skip, take } = this.calculatePagination(page, limit);

    const [bookmarks, total] = await this.executeQuery(async () =>
      this.bookmarksRepository
        .createQueryBuilder('bookmark')
        .innerJoinAndSelect('bookmark.post', 'post', 'post.status = :status', {
          status: PostStatus.PUBLISHED,
        })
        .where('bookmark.user_id = :userId', { userId: user.id })
        .skip(skip)
        .take(take)
        .getManyAndCount(),
    );

    return {
      bookmarks,
      total,
      page,
      limit,
      pages: Math.ceil(total / limit),
    };
  }

  async toggleBookmark(postId: string, userId: string) {
    return await this.executeQuery(async () => {
      const existingLike = await this.bookmarksRepository.findOneBy({
        post: { id: postId },
        user: { id: userId },
      });

      if (existingLike) {
        await this.bookmarksRepository.remove(existingLike);
      } else {
        const newLike = this.bookmarksRepository.create({
          post: { id: postId },
          user: { id: userId },
        });
        await this.bookmarksRepository.save(newLike);
      }

      return { message: 'Bookmark updated successfully' };
    });
  }
}
