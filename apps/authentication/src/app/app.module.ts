import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedTypeormModule } from '@messaging-app/backend-shared/modules';

@Module({
  imports: [SharedTypeormModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
