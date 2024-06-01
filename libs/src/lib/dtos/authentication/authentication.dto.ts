import { ApiProperty, PickType } from "@nestjs/swagger";
import { UserEntity } from "../../entities/authentication";

export class SignInDto extends PickType(UserEntity, ['username', 'password']) {}

export class AuthenticationResponseDto {
  
  @ApiProperty({type: 'string'})
  accessToken: string;

  @ApiProperty({type: 'string'})
  refreshToken: string;
}