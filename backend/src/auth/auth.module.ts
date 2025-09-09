import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtConfigService } from '../config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { HandlerException } from '../common/exceptions/handler.exception';

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, HandlerException],
  imports: [
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({ useClass: JwtConfigService, global: true }),
  ],
  exports: [TypeOrmModule, PassportModule],
})
export class AuthModule {}
