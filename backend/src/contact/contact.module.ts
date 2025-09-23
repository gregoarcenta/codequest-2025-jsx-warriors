import { Module } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactController } from './contact.controller';
import { MailModule } from '../mail/mail.module';
import { Contact } from './entities/contact.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  controllers: [ContactController],
  providers: [ContactService],
  imports: [MailModule, TypeOrmModule.forFeature([Contact])],
})
export class ContactModule {}
