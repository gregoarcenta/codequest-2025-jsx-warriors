import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ContactService } from './contact.service';
import { ContactDto } from './dto/contact.dto';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Contact Form')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Send contact form' })
  @ApiOkResponse({
    description: 'Send contact form successfully',
    example: { message: 'Mensaje enviado correctamente' },
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
    example: {
      message:
        'Hubo un problema al enviar el mensaje. Por favor, inténtelo de nuevo más tarde.',
    },
  })
  async send(@Body() dto: ContactDto) {
    return this.contactService.sendContactEmail(dto);
  }
}
