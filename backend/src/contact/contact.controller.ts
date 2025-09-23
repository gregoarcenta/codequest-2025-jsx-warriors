import { Controller, Post, Body } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactDto } from './dto/contact.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Contact Form')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  async send(@Body() dto: ContactDto) {
    return this.contactService.sendContactEmail(dto);
  }
}
