import { IsObject, IsString, IsUUID, IsUrl } from "class-validator";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { MessageEntity } from "./message.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({name: 'MessageMetadata', schema: 'message'})
export class MessageMetadataEntity {

  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({type: 'uuid'})
  id: string;

  @Column()
  @IsString()
  @IsUUID()
  @ApiProperty({type: 'uuid'})
  messageId: string;

  @Column()
  @IsString()
  @IsUrl()
  @ApiProperty({type: 'string'})
  fileUrl: string;

  @Column({nullable: true})
  @IsString()
  @ApiProperty({type: 'string'})
  caption: string;

  @OneToOne(() => MessageEntity)
  @JoinColumn({name: 'messageId', referencedColumnName: 'id'})
  @IsObject()
  @ApiProperty({type: MessageEntity})
  message: MessageEntity;

}