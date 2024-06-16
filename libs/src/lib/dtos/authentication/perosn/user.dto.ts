import { OmitType, PartialType } from '@nestjs/swagger';
import { UserEntity } from '../../../entities/authentication';
import { Exclude } from 'class-transformer';

export class CreateUserDto extends OmitType(UserEntity, ['id']) {
}

export class UpdateUserDto extends PartialType(OmitType(CreateUserDto, ['password'])) {
}

export class UserResponseDto extends OmitType(UserEntity, ['password']) {

  @Exclude()
  password: string;
}
