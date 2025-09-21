import { ISendMailOptions, MailerService } from '@nestjs-modules/mailer';
import { Injectable, Logger } from '@nestjs/common';
import { SentMessageInfo } from 'nodemailer';

@Injectable()

export class MailService {

    private readonly logger = new Logger(MailService.name);

    constructor(private readonly _mailerService: MailerService) { }

    public async sendEmail(params: {
        to: string,
        subject: string;
        template: string;
        context: ISendMailOptions['context'];
    }) {

        const sendMailParams = {
            to: params.to,
            subject: params.subject,
            template: params.template,
            context: params.context,
        };

        try {

            const response: SentMessageInfo = await this._mailerService.sendMail(sendMailParams);

            this.logger.log(
                `Email sent successfully\n` +
                `Parameters:\n${JSON.stringify(sendMailParams, null, 2)}\n` +
                `Response:\n${JSON.stringify(response, null, 2)}`
            );

        } catch (error) {
            this.logger.error(
                `Error while sending mail\n` +
                `Parameters:\n${JSON.stringify(params, null, 2)}\n` +
                `Error:\n${error instanceof Error ? error.stack : JSON.stringify(error, null, 2)}`
            );
        }

    }
}