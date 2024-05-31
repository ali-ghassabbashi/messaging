import { OmitType, PartialType } from "@nestjs/swagger";
import { UserEntity } from "../../../entities/authentication";

export class CreateUserDto extends OmitType(UserEntity, ['id']) {}

export class UpdateUserDto extends PartialType(OmitType(CreateUserDto, ['password'])) {}