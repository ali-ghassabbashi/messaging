import { Controller } from '@nestjs/common';
import { CreateUserDto, AuthenticationResponseDto, SignInDto } from '@messaging-app/backend-shared';
import { MessagePatternEnum } from '@messaging-app/backend-shared/constants';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { AuthenticationService } from './authentication.service';

@Controller()
export class AuthenticationRpcController {

  constructor(private readonly _authenticationService: AuthenticationService) {}

  @MessagePattern(MessagePatternEnum.SIGNUP_USER)
  createUser(@Payload() createUserDto: CreateUserDto): Promise<AuthenticationResponseDto> {
    return this._authenticationService.signUpUser(createUserDto);
  }

  @MessagePattern(MessagePatternEnum.SIGNIN_USER)
  signInUser(@Payload() signInDto: SignInDto): Promise<AuthenticationResponseDto> {
    return this._authenticationService.signInUser(signInDto);
  }
}
