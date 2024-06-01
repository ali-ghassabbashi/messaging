import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedTypeormModule } from '@messaging-app/backend-shared/modules';
import { UserModule } from '../modules/person/user/user.module';

@Module({
  imports: [
    SharedTypeormModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
