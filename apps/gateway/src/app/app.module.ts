import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthApiModule } from '../modules/auth-api/auth-api.module';

@Module({
  imports: [AuthApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
