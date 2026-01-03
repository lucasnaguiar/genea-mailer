import { BullModule } from '@nestjs/bullmq';
import { MailerModule } from './mailer/mailer.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MailerModule,
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST || 'redis',
        port: 6379,
      },
    }),
  ],
  controllers: [],
})
export class AppModule {}
