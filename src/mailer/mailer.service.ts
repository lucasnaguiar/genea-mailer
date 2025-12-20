// mail/mail.service.ts
import { Injectable } from '@nestjs/common';
import * as SibApiV3Sdk from 'sib-api-v3-sdk';
import { SendEmailDto } from './mailer-send.dto';

@Injectable()
export class MailerService {
  private apiInstance: SibApiV3Sdk.TransactionalEmailsApi;

  constructor() {
    const client = SibApiV3Sdk.ApiClient.instance;
    client.authentications['api-key'].apiKey = process.env.BREVO_API_KEY;

    this.apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
  }

  async sendEmail(data: SendEmailDto) {
    return this.apiInstance.sendTransacEmail({
      sender: {
        email: process.env.MAIL_FROM,
        name: process.env.MAIL_FROM_NAME,
      },
      to: [{ email: data.to }],
      subject: data.subject,
      htmlContent: data.html,
    });
  }
}
