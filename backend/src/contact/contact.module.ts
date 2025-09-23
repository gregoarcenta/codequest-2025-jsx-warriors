import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { MailModule } from '../mail/mail.module';

@Module({
  controllers: [ContactController],
  providers: [ContactService],
  imports: [MailModule],
})
export class ContactModule {}
