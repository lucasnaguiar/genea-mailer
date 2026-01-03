import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { MailerService } from './mailer.service';
import { SendEmailDto } from './mailer-send.dto';

@Processor('send-email')
export class MailerProcessor extends WorkerHost {
  constructor(private readonly mailerService: MailerService) {
    super();
  }

  async process(job: Job<SendEmailDto>) {
    await this.mailerService.sendEmail(job.data);
  }
}
