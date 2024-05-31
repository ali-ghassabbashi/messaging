import { Column, Entity, JoinColumn, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../../authentication";
import { MessageEntity } from "./message.entity";
import { IsDate, IsObject, IsString, IsUUID } from "class-validator";

@Entity({name: 'UserMessages', schema: 'message'})
export class UserMessageEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string[];

  @Column()
  @IsString()
  @IsUUID()
  messageId: string;

  @Column()
  @IsString()
  @IsUUID()
  userId: string;

  @ManyToMany(() => MessageEntity, message => message.recivers)
  @JoinColumn({name: 'messageId', referencedColumnName: 'id'})
  @IsObject()
  message: MessageEntity;

  @ManyToMany(() => UserEntity, user => user.inbox)
  @JoinColumn({name: 'userId', referencedColumnName: 'id'})
  @IsObject()
  user: UserEntity;

  @Column({type: 'date', nullable: true})
  @IsDate()
  receivedAt: Date;
}