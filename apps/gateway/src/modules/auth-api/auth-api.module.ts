import { Module } from '@nestjs/common';
import { AuthClientModule } from '@messaging-app/backend-shared/modules';
import { UserApiController } from './user-api.controller';
import { AuthApiController } from './auth-api.controller';

@Module({
  imports: [
    AuthClientModule
  ],
  controllers: [AuthApiController, UserApiController],
  providers: []
})
export class AuthApiModule {
}
