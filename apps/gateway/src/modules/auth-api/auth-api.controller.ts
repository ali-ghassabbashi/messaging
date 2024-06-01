import { Body, Controller, Get, HttpCode, NotFoundException, Param, Patch, Post } from '@nestjs/common';
import { UserEntity, CreateUserDto, UpdateUserDto, AuthenticationResponseDto, SignInDto } from '@messaging-app/backend-shared';
import { AuthClientService } from '@messaging-app/backend-shared/modules';
import { ApiBody, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';

@Controller('auth')
export class AuthClientController {
  
  constructor(private readonly _userService: AuthClientService) {}

  @Get('/all/:username')
  @ApiOperation({
    summary: 'Returns all usernames matches the search string.',
    description: 'Returns all usernames as an array of strings.',
  })
  @ApiParam({ name: 'username', type: 'string', required: true })
  @ApiOkResponse({ type: 'string', isArray: true })
  searchUsersByUsername(@Param('username') username: string): Promise<string[]> {
    return this._userService.findByUsername(username);
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Returns a single user info.',
    description: 'this route is protected by auth guard.',
  })
  @ApiParam({ name: 'id', type: 'string', required: true })
  @ApiOkResponse({ type: UserEntity })
  getUserInfo(id: string): Promise<UserEntity> {
    return this._userService.findOne(id)
  }

  @Post('/signup')
  @ApiOperation({
    summary: 'sign a new user up',
    description: 'this will return jwt tokens',
  })
  @ApiBody({ type: CreateUserDto, required: true })
  @ApiOkResponse({ type: AuthenticationResponseDto })
  signup(@Body() createUserDto: CreateUserDto): Promise<AuthenticationResponseDto> {
    return this._userService.signup(createUserDto);
  }

  @Post('/signin')
  @ApiOperation({
    summary: 'sign a new user in',
    description: 'this will return jwt tokens',
  })
  @ApiBody({ type: SignInDto, required: true })
  @ApiOkResponse({ type: AuthenticationResponseDto })
  signin(signInDto: SignInDto): Promise<AuthenticationResponseDto> {
    return this._userService.signin(signInDto);
  }

  @Patch('/:id')
  @ApiOperation({
    summary: 'update user info',
  })
  @ApiParam({ name: 'id', type: 'string', required: true })
  @HttpCode(204)
  @ApiNotFoundResponse({ type: NotFoundException })
  @ApiOkResponse({ type: UserEntity })
  updateUser(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    return this._userService.update(id, updateUserDto);
  }
}
