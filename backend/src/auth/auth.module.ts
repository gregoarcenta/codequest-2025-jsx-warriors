import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtConfigService } from '../config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { HandlerException } from '../common/exceptions/handler.exception';
import { DiscordStrategy } from './strategies/discord.strategy';
import { MailModule } from '../mail/mail.module';
import { PasswordResetToken } from './entities/password-reset-token.entity';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, DiscordStrategy, HandlerException],
  imports: [
    TypeOrmModule.forFeature([User, PasswordResetToken]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({ useClass: JwtConfigService, global: true }),
    MailModule,
  ],
  exports: [TypeOrmModule, PassportModule, AuthService],
})
export class AuthModule {}
