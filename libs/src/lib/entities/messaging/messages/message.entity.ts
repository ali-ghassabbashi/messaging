import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../../authentication";
import { MessageMetadataEntity } from "./message-metadata.entity";
import { IsNotEmpty, IsObject, IsString, IsUUID, ValidateIf } from "class-validator";
import { UserMessageEntity } from "./user-messages.entity";

@Entity({name: 'Messages', schema: 'message'})
export class MessageEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  @ValidateIf((msg: Partial<MessageEntity>) => !msg.metadata)
  content: string;

  @OneToOne(() => MessageMetadataEntity, msgMeta => msgMeta.message)
  @IsObject()
  @ValidateIf((msg: MessageEntity) => !msg.content)
  metadata: MessageMetadataEntity;

  @Column()
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  senderId: string;

  @ManyToOne(() => UserEntity, user => user.messages)
  @JoinColumn({name: 'senderId', referencedColumnName: 'id'})
  @IsObject()
  sender: UserEntity;

  @OneToMany(() => UserMessageEntity, userMessage => userMessage.message)
  @IsObject({ each:true })
  recivers: UserMessageEntity[];

  @CreateDateColumn()
  sendedAt: Date;
}