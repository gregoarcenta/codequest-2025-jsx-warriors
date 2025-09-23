import { Module } from '@nestjs/common';
import { NewsletterService } from './newsletter.service';
import { NewsletterController } from './newsletter.controller';
import { MailModule } from '../mail/mail.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscriber } from './entities/newsletter.entity';
import { HandlerException } from '../common/exceptions/handler.exception';

@Module({
  controllers: [NewsletterController],
  providers: [NewsletterService, HandlerException],
  imports: [MailModule, TypeOrmModule.forFeature([Subscriber])],
})
export class NewsletterModule {}
