import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { HandlerException } from '../common/exceptions/handler.exception';
import { IPayloadJwt } from './strategies/jwt.strategy';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { User } from '../users/entities/user.entity';
import { MailService } from 'src/mail/mail.service';
import { ConfigService } from '@nestjs/config';
import { PasswordResetToken } from './entities/password-reset-token.entity';
import { AuthResponse, DiscordUser, ResetPasswordPayload } from './interfaces';
import { Role } from '../config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(PasswordResetToken)
    private readonly passwordResetToken: Repository<PasswordResetToken>,
    private readonly handlerException: HandlerException,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<AuthResponse> {
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
      lastLoginAt: new Date(),
      password: await bcrypt.hash(signUpDto.password, 10),
    });

    try {
      const usersCount = await this.usersRepository.count();
      if (usersCount === 0) {
        user.roles = [Role.ADMIN];
      }
      await this.usersRepository.save(user);
    } catch (err) {
      this.handlerException.handlerDBException(err);
    }

    return {
      user: await this.findUser(user.id),
      accessToken: await this.getJwtToken({ id: user.id }),
    };
  }

  async signIn(signInDto: SignInDto): Promise<AuthResponse> {
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

    if (!user.isActive) {
      throw new UnauthorizedException('User is inactive, talk with an admin');
    }

    const isValidPassword = await bcrypt.compare(
      signInDto.password,
      user.password,
    );

    if (!isValidPassword)
      throw new UnauthorizedException('Credentials are not valid (password)');

    await this.updateLastLogin(user.id);

    return {
      user: await this.findUser(user.id),
      accessToken: await this.getJwtToken({ id: user.id }),
    };
  }

  async signInWithDiscord(discordUser: DiscordUser): Promise<AuthResponse> {
    const user = await this.findOrCreateUserDiscord(discordUser);

    await this.updateLastLogin(user.id);

    const accessToken = await this.getJwtToken({ id: user.id });

    return { user, accessToken };
  }

  async checkStatus(user: User): Promise<AuthResponse> {
    return {
      user,
      accessToken: await this.getJwtToken({ id: user.id }),
    };
  }

  async findUser(id: string): Promise<User> {
    let user: User;

    try {
      user = await this.usersRepository
        .createQueryBuilder('user')
        .loadRelationCountAndMap('user.likesCount', 'user.likes')
        .loadRelationCountAndMap('user.postsCount', 'user.posts')
        .where('user.id = :id', { id })
        .getOne();
    } catch (err) {
      this.handlerException.handlerDBException(err);
    }

    if (!user) throw new NotFoundException("User can't be found");

    return user;
  }

  async findOrCreateUserDiscord(discordUser: DiscordUser): Promise<User> {
    const { id: discordId, email, global_name, avatar } = discordUser;

    if (!discordId) throw new BadRequestException('Discord ID is required');

    const avatarUrl = avatar
      ? `https://cdn.discordapp.com/avatars/${discordId}/${avatar}.png`
      : null;

    try {
      // Buscar solo por discordId
      let user = await this.usersRepository.findOne({ where: { discordId } });

      // Si no hay cuenta vinculada, opcionalmente busca por email
      if (!user && email) {
        const byEmail = await this.usersRepository.findOne({
          where: { email },
        });
        if (byEmail) {
          // Si existe, vincula ese correo a la cuenta de Discord
          byEmail.discordId = discordId;
          user = byEmail;
        }
      }

      if (user) {
        user.avatarUrl = avatarUrl ?? user.avatarUrl;
        user.fullName = global_name ?? user.fullName;
        return this.usersRepository.save(user);
      }

      // Crear nuevo usuario
      const newUser = this.usersRepository.create({
        discordId,
        email,
        fullName: global_name,
        avatarUrl,
      });
      return this.usersRepository.save(newUser);
    } catch (err) {
      this.handlerException.handlerDBException(err);
    }
  }

  private async getJwtToken(payload: IPayloadJwt): Promise<string> {
    return await this.jwtService.signAsync(payload);
  }

  async updateLastLogin(userId: string): Promise<void> {
    await this.usersRepository.query(
      `UPDATE users SET last_login_at = NOW() WHERE id = $1`,
      [userId],
    );
  }

  public async forgotPassword(email: string): Promise<Object> {
    const urlFront = this.configService.get<string>('FRONTEND_URL');
    const secret = this.configService.get<string>('JWT_SECRET');

    const user = await this.usersRepository.findOne({ where: { email } });

    if (!user) throw new NotFoundException('User not found');

    const jwtId: string = uuidv4();

    const tokenPasswordRecovery = this.jwtService.sign(
      { id: user.id, email: user.email },
      { secret, expiresIn: '15m', jwtid: jwtId },
    );

    const resetRecord = this.passwordResetToken.create({
      userId: user.id,
      jwtId,
      expiresAt: new Date(Date.now() + 15 * 60 * 1000),
    });

    await this.passwordResetToken.save(resetRecord);

    const linkPasswordRecovery = `${urlFront}/forgot-password?token=${encodeURIComponent(tokenPasswordRecovery)}`;

    const bodyEmailPasswordRecovery = {
      to: user.email,
      subject: 'Solicitud de restablecimiento de contraseña',
      template: 'password-reset-email-link',
      context: {
        email: user.email,
        url: linkPasswordRecovery,
        appName: this.configService.get<string>('APP_NAME'),
        supportEmail: this.configService.get<string>('SUPPORT_EMAIL'),
      },
    };

    await this.mailService.sendEmail(bodyEmailPasswordRecovery);

    return {
      statusCode: HttpStatus.OK,
      message:
        'El enlace para restablecer tu contraseña se ha enviado exitosamente a tu correo electrónico.',
    };
  }

  public async resetPasswordConfirm(
    token: string,
    password: string,
  ): Promise<Object> {
    let payload: ResetPasswordPayload = null;

    try {
      payload = this.jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
    } catch (e) {
      throw new UnauthorizedException('Token inválido o expirado');
    }

    const record = await this.passwordResetToken.findOne({
      where: { jwtId: payload.jti, userId: payload.id },
    });

    if (!record) throw new UnauthorizedException('Token no registrado');
    if (record.isUsed)
      throw new BadRequestException('El token ya fue utilizado');
    if (record.expiresAt < new Date())
      throw new BadRequestException('El token ha expirado');

    const user = await this.usersRepository.findOne({
      where: { id: payload.id },
    });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    user.password = await bcrypt.hash(password, 10);
    await this.usersRepository.save(user);

    record.isUsed = true;
    record.usedAt = new Date();
    const savedRecord = await this.passwordResetToken.save(record);

    if (!savedRecord) {
      throw new BadRequestException(
        'No se pudo actualizar el estado del token',
      );
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'La contraseña se ha restablecido correctamente.',
    };
  }
}
