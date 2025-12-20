import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { SendEmailDto } from './mailer-send.dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller()
export class MailerController {
  constructor(private readonly mailService: MailerService) {}

  @Post('mail/send')
  @UseGuards(AuthGuard)
  sendEmail(@Body() mailData: SendEmailDto) {
    this.mailService.sendEmail(mailData);
  }

  @Get('/')
  sayHello(): string {
    return 'Hello WOrld';
  }
}
