import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { HandlerException } from '../common/exceptions/handler.exception';
import { IPayloadJwt } from './strategies/jwt.strategy';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { User } from './entities/user.entity';
import { UserResponse } from './interfaces/user-response';
import { DiscordUser } from './interfaces/discord-user';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    private readonly handlerException: HandlerException,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<UserResponse> {
    const existingUser = await this.usersRepository.findOneBy({
      email: signUpDto.email,
    });

    if (existingUser?.discordId) {
      throw new UnauthorizedException(
        'This email is already associated with a Discord account',
      );
    }

    const user = this.usersRepository.create({
      ...signUpDto,
      password: await bcrypt.hash(signUpDto.password, 10),
    });

    try {
      await this.usersRepository.save(user);
    } catch (err) {
      this.handlerException.handlerDBException(err);
    }

    return {
      user: await this.findUser(user.id),
      accessToken: await this.getJwtToken({ id: user.id }),
    };
  }

  async signIn(signInDto: SignInDto): Promise<UserResponse> {
    let user: User;
    try {
      user = await this.usersRepository
        .createQueryBuilder('user')
        .addSelect('user.password')
        .where('user.email = :email', { email: signInDto.email })
        .getOne();
    } catch (err) {
      this.handlerException.handlerDBException(err);
    }

    if (!user)
      throw new UnauthorizedException('Credentials are not valid (email)');

    const isValidPassword = await bcrypt.compare(
      signInDto.password,
      user.password,
    );

    if (!isValidPassword)
      throw new UnauthorizedException('Credentials are not valid (password)');

    return {
      user: await this.findUser(user.id),
      accessToken: await this.getJwtToken({ id: user.id }),
    };
  }

  async signInWithDiscord(discordUser: DiscordUser): Promise<UserResponse> {
    const user = await this.findOrCreateUserDiscord(discordUser);

    const accessToken = await this.getJwtToken({ id: user.id });

    return { user, accessToken };
  }

  async checkStatus(user: User): Promise<UserResponse> {
    return {
      user,
      accessToken: await this.getJwtToken({ id: user.id }),
    };
  }

  async findUser(id: string): Promise<User> {
    let user: User;

    try {
      user = await this.usersRepository.findOneBy({ id });
    } catch (err) {
      this.handlerException.handlerDBException(err);
    }

    if (!user) throw new NotFoundException("User can't be found");

    return user;
  }

  async findOrCreateUserDiscord(discordUser: DiscordUser): Promise<User> {
    const { id: discordId, email, global_name } = discordUser;

    try {
      // Buscar primero por email
      const user = await this.usersRepository.findOneBy({ email });

      if (user) {
        // Si el usuario existe pero no tiene discordId, lo actualizamos
        if (!user.discordId) {
          user.discordId = discordId;
          await this.usersRepository.save(user);
        }
        return user;
      }

      // Crear usuario nuevo
      return await this.usersRepository.save(
        this.usersRepository.create({
          discordId,
          fullName: global_name,
          email,
        }),
      );
    } catch (err) {
      this.handlerException.handlerDBException(err);
    }
  }

  private async getJwtToken(payload: IPayloadJwt): Promise<string> {
    return await this.jwtService.signAsync(payload);
  }
}
