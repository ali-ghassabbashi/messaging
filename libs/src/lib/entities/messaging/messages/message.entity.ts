import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from "../person/user.entity";
import { MessageMetadataEntity } from "./message-metadata.entity";
import { IsNotEmpty, IsObject, IsString, IsUUID, ValidateIf } from "class-validator";
import { UserMessageEntity } from "./user-messages.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({name: 'Messages', schema: 'message'})
export class MessageEntity {

  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({type: 'uuid'})
  id: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  @ValidateIf((msg: Partial<MessageEntity>) => !msg.metadata)
  @ApiProperty({type: 'string'})
  content?: string;

  @OneToOne(() => MessageMetadataEntity, msgMeta => msgMeta.message)
  @IsObject()
  @ValidateIf((msg: MessageEntity) => !msg.content)
  @ApiProperty({type: MessageMetadataEntity, nullable: true})
  metadata?: MessageMetadataEntity;

  @Column()
  @IsString()
  @IsUUID()
  @IsNotEmpty()
  @ApiProperty({type: 'uuid'})
  senderId: string;

  @ManyToOne(() => UserEntity, user => user.messages)
  @JoinColumn({name: 'senderId', referencedColumnName: 'id'})
  @IsObject()
  @ApiProperty({type: UserEntity})
  sender: UserEntity;

  @OneToMany(() => UserMessageEntity, userMessage => userMessage.message)
  @IsObject({ each:true })
  @ApiProperty({type: UserMessageEntity, isArray: true})
  receivers: UserMessageEntity[];

  @CreateDateColumn()
  @ApiProperty({type: 'date'})
  sendedAt: Date;

  @UpdateDateColumn()
  @ApiProperty({type: 'date'})
  updatedAt: Date;
}
