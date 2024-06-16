import { Body, Controller, Post } from '@nestjs/common';
import { AuthClientService } from '@messaging-app/backend-shared/modules';
import { ApiBody, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { AuthenticationResponseDto, CreateUserDto, SignInDto } from '@messaging-app/backend-shared/dtos';

@Controller('auth')
export class AuthApiController {
  constructor(private readonly _userService: AuthClientService) {
  }

  @Post('/signup')
  @ApiOperation({
    summary: 'sign a new user up',
    description: 'this will return jwt tokens'
  })
  @ApiBody({ type: CreateUserDto, required: true })
  @ApiOkResponse({ type: AuthenticationResponseDto })
  signup(@Body() createUserDto: CreateUserDto): Promise<AuthenticationResponseDto> {
    return this._userService.signup(createUserDto);
  }

  @Post('/signin')
  @ApiOperation({
    summary: 'sign a new user in',
    description: 'this will return jwt tokens'
  })
  @ApiBody({ type: SignInDto, required: true })
  @ApiOkResponse({ type: AuthenticationResponseDto })
  signin(signInDto: SignInDto): Promise<AuthenticationResponseDto> {
    return this._userService.signin(signInDto);
  }
}
