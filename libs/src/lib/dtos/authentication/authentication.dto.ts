import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, ValidateIf } from "class-validator";

export class SignInDto {

  @IsString()
  @IsNotEmpty()
  @ValidateIf((obj: SignInDto) => !obj.email)
  username: string;

  @IsString()
  @IsNotEmpty()
  @ValidateIf((obj: SignInDto) => !obj.username)
  email: string;
  
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class AuthenticationResponseDto {
  
  @ApiProperty({type: 'string'})
  accessToken: string;

  @ApiProperty({type: 'string'})
  refreshToken: string;
}