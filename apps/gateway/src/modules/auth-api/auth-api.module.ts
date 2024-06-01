import { Module } from '@nestjs/common';
import { AuthClientController } from './auth-api.controller';
import { AuthClientModule } from '@messaging-app/backend-shared';

@Module({
  imports: [
    AuthClientModule
  ],
  controllers: [AuthClientController],
  providers: [],
})
export class AuthApiModule {}
