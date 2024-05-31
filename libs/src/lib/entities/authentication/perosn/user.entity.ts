import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import {IsEmail, IsNotEmpty, IsString, Length, Matches} from 'class-validator'


@Entity({name: 'Users', schema: 'person'})
export class UserEntity {
  
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @IsString()
  username: string;

  @Column()
  @IsString()
  @Length(8, 20, { message: 'Password must be between 8 and 20 characters.' })
  @Matches(/(?=.*[a-z])/, { message: 'Password must contain at least one lowercase letter.' })
  @Matches(/(?=.*[A-Z])/, { message: 'Password must contain at least one uppercase letter.' })
  @Matches(/(?=.*\d)/, { message: 'Password must contain at least one number.' })
  @Matches(/(?=.*[@$!%*?&])/, { message: 'Password must contain at least one special character.' })
  password: string;

  @Column()
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @Column()
  @IsString()
  @IsEmail()
  email: string;
}