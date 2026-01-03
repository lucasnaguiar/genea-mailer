import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { SendEmailDto } from './mailer-send.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bullmq';

@Controller()
export class MailerController {
  constructor(@InjectQueue('send-email') private readonly emailQueue: Queue) {}

  @Post('mail/send')
  @UseGuards(AuthGuard)
  async sendEmail(@Body() mailData: SendEmailDto) {
    await this.emailQueue.add('send', mailData, {
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 5000,
      },
    });
  }

  @Get('/')
  sayHello(): string {
    return 'Hello WOrld';
  }
}
