import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ContactDto } from './dto/contact.dto';
import { MailService } from '../mail/mail.service';
import { ConfigService } from '@nestjs/config';
import { Contact } from './entities/contact.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
  ) {}
  async sendContactEmail(data: ContactDto) {
    const { email, message, subject, fullName, company, phone } = data;
    try {
      const newContactMessage = this.contactRepository.create({
        ...data,
      });
      await this.contactRepository.save(newContactMessage);

      const bodySentContact = {
        to: this.configService.get<string>('SUPPORT_EMAIL'),
        subject: `Nuevo mensaje de contacto de ${fullName}`,
        template: 'contact-form-sent',
        context: {
          senderName: fullName,
          senderEmail: email,
          message,
          subject,
          company,
          phone,
          appName: this.configService.get<string>('APP_NAME'),
        },
      };
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
