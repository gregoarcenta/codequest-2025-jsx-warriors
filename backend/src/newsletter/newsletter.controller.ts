import { Controller, Get, Post, Body, Query, Res } from '@nestjs/common';
import { NewsletterService } from './newsletter.service';
import { SubscribeDto } from './dto/create-newsletter.dto';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';

@ApiTags('Newsletter')
@Controller('newsletter')
export class NewsletterController {
  constructor(
    private readonly newsletterService: NewsletterService,
    private readonly configService: ConfigService,
  ) {}

  @Post('subscribe')
  async subscribe(@Body() subscribeDto: SubscribeDto) {
    return this.newsletterService.subscribe(subscribeDto.email);
  }

  @Get('confirm')
  async confirm(@Query('token') token: string, @Res() res: Response) {
    await this.newsletterService.confirmSubscription(token);
    const route = `${this.configService.get('FRONTEND_URL')}/?subscribe=true`;
    res.redirect(route);
  }
}
