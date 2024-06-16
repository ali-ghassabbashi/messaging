import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { IsEmail, IsNotEmpty, IsObject, IsOptional, IsString, Length, Matches } from 'class-validator';
import { MessageEntity, UserMessageEntity } from '../../messaging';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity({ name: 'Users', schema: 'person' })
@Unique('username_unique', ['username'])
@Unique('email_unique', ['email'])
@Index(['username'], { unique: true })
@Index(['email'], { unique: true })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty({ type: 'uuid' })
  id: string;

  @Column()
  @IsString()
  @ApiProperty({ type: 'string' })
  username: string;

  @Column()
  @IsString()
  @Length(8, 20, { message: 'Password must be between 8 and 20 characters.' })
  @Matches(/(?=.*[a-z])/, { message: 'Password must contain at least one lowercase letter.' })
  @Matches(/(?=.*[A-Z])/, { message: 'Password must contain at least one uppercase letter.' })
  @Matches(/(?=.*\d)/, { message: 'Password must contain at least one number.' })
  @Matches(/(?=.*[@$!%*?&])/, { message: 'Password must contain at least one special character.' })
  @ApiProperty({ type: 'string' })
  password: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: 'string' })
  fullName: string;

  @Column()
  @IsString()
  @IsEmail()
  @ApiProperty({ type: 'string' })
  email: string;

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
