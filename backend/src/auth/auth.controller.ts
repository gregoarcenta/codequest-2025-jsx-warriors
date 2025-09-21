import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { User } from '../users/entities/user.entity';
import { Auth, GetUser } from './decorators';
import { AuthGuard } from '@nestjs/passport';
import { DiscordUser } from './interfaces/discord-user';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import {
  ApiCheckStatusResponse,
  ApiSignInResponse,
  ApiSignUpResponse,
  ApiDiscordSignUpResponse,
  ApiDiscordCallbackResponse,
} from '../swagger/decorators/auth';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService,
    private configService: ConfigService,
  ) { }

  @Post('signup')
  @ApiSignUpResponse()
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }

  @Post('signin')
  @HttpCode(HttpStatus.OK)
  @ApiSignInResponse()
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto);
  }

  @Get('discord')
  @UseGuards(AuthGuard('discord'))
  @ApiDiscordSignUpResponse()
  async discordSignIn() { }

  @Get('discord/callback')
  @UseGuards(AuthGuard('discord'))
  @ApiDiscordCallbackResponse()
  async discordCallback(
    @GetUser() discordUser: DiscordUser,
    @Res() res: Response,
  ) {
    const { accessToken } =
      await this.authService.signInWithDiscord(discordUser);

    const route = `${this.configService.get('FRONTEND_URL')}/login?token=${accessToken}`;

    res.redirect(route);
  }

  @Get('check-status')
  @Auth()
  @ApiCheckStatusResponse()
  checkStatus(@GetUser() user: User) {
    return this.authService.checkStatus(user);
  }

  @Post('forgot-password')
  @HttpCode(HttpStatus.OK)
  public async forgotPassword(@Body() dto: ForgotPasswordDto): Promise<Object> {
    return await this.authService.forgotPassword(dto.email);
  }

  @Post('reset-password')
  @HttpCode(HttpStatus.OK)
  public async resetPasswordConfirm(@Body() { token, password }: ResetPasswordDto): Promise<Object> {
    return await this.authService.resetPasswordConfirm(token, password);
  }

}