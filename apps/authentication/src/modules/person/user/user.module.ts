import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity, MessageEntity, MessageMetadataEntity, UserMessageEntity } from '@messaging-app/backend-shared'

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, MessageEntity, MessageMetadataEntity, UserMessageEntity])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
