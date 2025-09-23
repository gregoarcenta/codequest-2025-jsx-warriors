import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { NewsletterService } from './newsletter.service';
import { SubscribeDto } from './dto/create-newsletter.dto';

@Controller('newsletter')
export class NewsletterController {
  constructor(private readonly newsletterService: NewsletterService) {}

  @Post('subscribe')
  async subscribe(@Body() subscribeDto: SubscribeDto) {
    return this.newsletterService.subscribe(subscribeDto.email);
  }

  @Get('confirm')
  async confirm(@Query('token') token: string) {
    return this.newsletterService.confirmSubscription(token);
  }
}
