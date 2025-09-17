import { Injectable, OnModuleInit } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HandlerException } from '../common/exceptions/handler.exception';
import { User } from './entities/user.entity';
import { AuthService } from '../auth/auth.service';
import { userInitialData } from '../data/user.data';

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

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
