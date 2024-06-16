import { Controller, Get, HttpCode, NotFoundException, Param, Patch, UseGuards } from '@nestjs/common';
import { AuthClientService } from '@messaging-app/backend-shared/modules';
import { ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam } from '@nestjs/swagger';
import { Serialize } from '@messaging-app/backend-shared/decorators';
import { UserEntity } from '@messaging-app/backend-shared/entities';
import { UpdateUserDto, UserResponseDto } from '@messaging-app/backend-shared/dtos';
import { AuthGuard } from '@messaging-app/backend-shared/guards';

@Controller('user')
@Serialize(UserResponseDto)
@UseGuards(AuthGuard)
export class UserApiController {
  constructor(private readonly _userService: AuthClientService) {
  }

  @Get('/all/:username')
  @ApiOperation({
    summary: 'Returns all usernames matches the search string.',
    description: 'Returns all usernames as an array of strings.'
  })
  @ApiParam({ name: 'username', type: 'string', required: true })
  @ApiOkResponse({ type: 'string', isArray: true })
  searchUsersByUsername(@Param('username') username: string): Promise<string[]> {
    return this._userService.findByUsername(username);
  }

  @Get('/:id')
  @ApiOperation({
    summary: 'Returns a single user info.',
    description: 'this route is protected by auth guard.'
  })
  @ApiParam({ name: 'id', type: 'string', required: true })
  @ApiOkResponse({ type: UserEntity })
  async getUserInfo(@Param('id') id: string): Promise<UserEntity> {
    return this._userService.findOne(id);
  }

  @Patch('/:id')
  @ApiOperation({ summary: 'update user info' })
  @ApiParam({ name: 'id', type: 'string', required: true })
  @HttpCode(204)
  @ApiNotFoundResponse({ type: NotFoundException })
  @ApiOkResponse({ type: UserEntity })
  updateUser(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    return this._userService.update(id, updateUserDto);
  }
}
