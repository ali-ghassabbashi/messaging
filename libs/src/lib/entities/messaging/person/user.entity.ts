import {Entity, OneToMany, PrimaryColumn} from 'typeorm';
import {IsObject, IsOptional, IsUUID} from 'class-validator';
import {MessageEntity, UserMessageEntity} from '../../messaging';
import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';

@Entity({ name: 'Users', schema: 'person' })
export class UserEntity {

  @PrimaryColumn({type: 'uuid'})
  @IsUUID()
  @ApiProperty({ type: 'uuid' })
  id: string;

  @OneToMany(() => MessageEntity, (message) => message.sender)
  @IsObject()
  @IsOptional()
  @ApiPropertyOptional({ type: MessageEntity, isArray: true, nullable: true })
  messages?: MessageEntity[];

  @OneToMany(() => UserMessageEntity, (userMessage) => userMessage.user)
  @IsObject()
  @IsOptional()
  @ApiPropertyOptional({ type: UserMessageEntity, isArray: true })
  inbox?: UserMessageEntity[];
}
