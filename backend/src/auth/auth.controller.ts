import {
  Body,
  Controller,
  HttpCode,
  Post,
  Get,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { SignInDto } from './dto/sign-in.dto';
import { User } from './entities/user.entity';
import { Auth, GetUser } from './decorators';
import {
  ApiCheckStatusResponse,
  ApiSignInResponse,
  ApiSignUpResponse,
} from '../swagger/decorators/auth';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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

  @Get('check-status')
  @Auth()
  @ApiCheckStatusResponse()
  checkStatus(@GetUser() user: User) {
    return this.authService.checkStatus(user);
  }
}
