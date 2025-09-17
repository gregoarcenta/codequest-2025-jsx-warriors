import { Injectable, OnModuleInit } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HandlerException } from '../common/exceptions/handler.exception';
import { User } from './entities/user.entity';
import { AuthService } from '../auth/auth.service';
import { userInitialData } from '../data/user.data';
import { PaginateDto } from '../common/dto/paginate.dto';

@Injectable()
export class UsersService implements OnModuleInit {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly handlerException: HandlerException,
    private readonly authService: AuthService,
  ) {}
  async onModuleInit() {
    try {
      const count = await this.usersRepository.count();
      if (count === 0) {
        const { user } = await this.authService.signUp(userInitialData[0]);
        console.log(`User ${user.fullName} with ${user.roles[0]} role created`);
      }
    } catch (err) {
      this.handlerException.handlerDBException(err);
    }
  }

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

  findOne(id: number) {
    return `This action returns a #${id} user`;
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

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
