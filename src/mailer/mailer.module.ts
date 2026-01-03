import { Module } from '@nestjs/common';
import { MailerController } from './mailer.controller';
import { MailerService } from './mailer.service';
import { BullModule } from '@nestjs/bullmq';
import { MailerProcessor } from './mailer.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'send-email',
    }),
  ],
  controllers: [MailerController],
  providers: [MailerService, MailerProcessor],
})
export class MailerModule {}
