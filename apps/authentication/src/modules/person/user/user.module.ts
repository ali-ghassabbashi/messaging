import { Module } from '@nestjs/common';
import { UserRpcController } from './user.rpc.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageEntity, MessageMetadataEntity, UserEntity, UserMessageEntity } from '@messaging-app/backend-shared/entities';
import { AuthenticationRpcController } from './authentication.rpc.controller';
import { AuthenticationService } from './authentication.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([UserEntity, MessageEntity, MessageMetadataEntity, UserMessageEntity])
  ],
  controllers: [UserRpcController, AuthenticationRpcController],
  providers: [UserService, AuthenticationService]
})
export class UserModule {
}
