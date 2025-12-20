import { Controller, Get, Post } from '@nestjs/common';
import { MailerService } from './mailer.service';
import { SendEmailDto } from './mailer-send.dto';

@Controller()
export class MailerController {
  constructor(private readonly mailService: MailerService) {}

  @Post()
  sendEmail() {
    let mailDto = new SendEmailDto();

    mailDto.to = 'lucasbarbary@gmail.com';
    mailDto.subject = 'teste de envio';
    mailDto.html = '<h1> hello world  </h1>';

    this.mailService.sendEmail(mailDto);
  }

  @Get('/')
  sayHello(): string {
    return 'Hello WOrld';
  }
}
