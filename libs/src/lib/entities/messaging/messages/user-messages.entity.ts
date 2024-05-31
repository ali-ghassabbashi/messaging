import { Column, Entity, JoinColumn, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "../../authentication";
import { MessageEntity } from "./message.entity";
import { IsDate, IsObject, IsString, IsUUID } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

@Entity({name: 'UserMessages', schema: 'message'})
export class UserMessageEntity {

  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({type: 'uuid'})
  id: string[];

  @Column()
  @IsString()
  @IsUUID()
  @ApiProperty({type: 'uuid'})
  messageId: string;

  @Column()
  @IsString()
  @IsUUID()
  @ApiProperty({type: 'uuid'})
  userId: string;

  @ManyToMany(() => MessageEntity, message => message.recivers)
  @JoinColumn({name: 'messageId', referencedColumnName: 'id'})
  @IsObject()
  @ApiProperty({type: MessageEntity})
  message: MessageEntity;

  @ManyToMany(() => UserEntity, user => user.inbox)
  @JoinColumn({name: 'userId', referencedColumnName: 'id'})
  @IsObject()
  @ApiProperty({type: UserEntity})
  user: UserEntity;

  @Column({type: 'date', nullable: true})
  @IsDate()
  @ApiProperty({type: 'date'})
  receivedAt: Date;
}