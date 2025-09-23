import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ContactDto } from './dto/contact.dto';
import { MailService } from '../mail/mail.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ContactService {
  constructor(
    private readonly mailService: MailService,
    private readonly configService: ConfigService,
  ) {}
  async sendContactEmail(data: ContactDto) {
    const { email, message, subject, name, company, phone } = data;
    const bodySentContact = {
      to: this.configService.get<string>('SUPPORT_EMAIL'),
      subject: `Nuevo mensaje de contacto de ${name}`,
      template: 'contact-form-sent',
      context: {
        senderName: name,
        senderEmail: email,
        message,
        subject,
        company,
        phone,
        appName: this.configService.get<string>('APP_NAME'),
      },
    };

    try {
      await this.mailService.sendEmail(bodySentContact);
      return { message: 'Mensaje enviado correctamente' };
    } catch (error) {
      console.error('Error al enviar el correo de contacto:', error);
      throw new InternalServerErrorException(
        'Hubo un problema al enviar el mensaje. Por favor, inténtelo de nuevo más tarde.',
      );
    }
  }
}
