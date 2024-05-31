import { IsObject, IsString, IsUUID, IsUrl } from "class-validator";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { MessageEntity } from "./message.entity";

@Entity({name: 'MessageMetadata', schema: 'message'})
export class MessageMetadataEntity {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsString()
  @IsUUID()
  messageId: string;

  @Column()
  @IsString()
  @IsUrl()
  fileUrl: string;

  @Column({nullable: true})
  @IsString()
  caption: string;

  @OneToOne(() => MessageEntity)
  @JoinColumn({name: 'messageId', referencedColumnName: 'id'})
  @IsObject()
  message: MessageEntity;

}