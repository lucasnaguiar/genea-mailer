import { MailerModule } from './mailer/mailer.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MailerModule,
  ],
  controllers: [],
})
export class AppModule {}
