import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscriber } from './entities/newsletter.entity';
import { Repository } from 'typeorm';
import { MailService } from '../mail/mail.service';
import { ConfigService } from '@nestjs/config';
import { HandlerException } from '../common/exceptions/handler.exception';

@Injectable()
export class NewsletterService {
  constructor(
    @InjectRepository(Subscriber)
    private readonly subscriberRepository: Repository<Subscriber>,
    private readonly handlerException: HandlerException,
    private readonly configService: ConfigService,
    private readonly mailService: MailService,
  ) {}
  async subscribe(email: string) {
    const repo = this.subscriberRepository;
    try {
      const existingSubscriber = await repo.findOne({ where: { email } });

      if (!existingSubscriber) {
        const token = crypto.randomUUID();
        const newSubscriber = repo.create({ email, confirmationToken: token });

        await repo.save(newSubscriber);
        await this.sendConfirmationEmail(newSubscriber);
        return {
          message:
            'Subscription successful. Please check your email to confirm.',
        };
      }

      if (existingSubscriber.isConfirmed) {
        throw new BadRequestException(
          'This email is already subscribed and confirmed.',
        );
      }

      await this.sendConfirmationEmail(existingSubscriber);
      return {
        message:
          'This email is already subscribed. A confirmation email has been re-sent.',
      };
    } catch (error) {
      console.error('Error during subscription:', error);
      throw new InternalServerErrorException('Failed to process subscription.');
    }
  }

  async confirmSubscription(token: string) {
    const repo = this.subscriberRepository;
    const subscriber = await this.subscriberRepository.findOne({
      where: { confirmationToken: token },
    });

    if (!subscriber) {
      throw new NotFoundException('Invalid or expired confirmation token.');
    }

    if (subscriber.isConfirmed) {
      throw new BadRequestException('This subscription is already confirmed.');
    }

    subscriber.isConfirmed = true;
    subscriber.confirmedAt = new Date();
    subscriber.confirmationToken = null; // Remove token after confirmation
    await this.subscriberRepository.save(subscriber);

    return { message: 'Email successfully confirmed. Thank you!' };
  }

  private async sendConfirmationEmail(subscriber: Subscriber) {
    const appUrl = this.configService.get<string>('APP_URL');
    const confirmationLink = `${appUrl}/confirm-subscription?token=${subscriber.confirmationToken}`;

    // Aquí llamas a tu servicio de correo con la plantilla de confirmación
    await this.mailService.sendEmail({
      to: subscriber.email,
      subject: 'Confirm your subscription',
      template: 'confirmation-email', // Tendrás que crear esta plantilla
      context: {
        appName: this.configService.get<string>('APP_NAME'),
        confirmationLink: confirmationLink,
      },
    });
  }
}
