import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { PugAdapter } from '@nestjs-modules/mailer/dist/adapters/pug.adapter';

import { join } from 'path';

import { MailService } from './mail.service';

@Module({
    imports: [
        MailerModule.forRootAsync({
            useFactory: () => ({
                transport: {
                    service: "gmail",
                    port: +process.env.SMTP_PORT,
                    secure: true,
                    logger: true,
                    debug: true,
                    secureConnection: true,
                    auth: {
                        user: process.env.SMTP_USER,
                        pass: process.env.SMTP_PASS,
                    },
                    tls: {
                        rejectUnauthorized: true
                    }

                },
                template: {
                    dir: join(__dirname, 'templates'),
                    adapter: new PugAdapter(),
                    options: { strict: true },
                },
            }),
        }),
    ],
    providers: [MailService],
    exports: [MailService]
})

export class MailModule { }