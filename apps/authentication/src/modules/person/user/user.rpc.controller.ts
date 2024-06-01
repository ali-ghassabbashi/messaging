import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity, UpdateUserDto } from '@messaging-app/backend-shared';
import { MessagePatternEnum } from '@messaging-app/backend-shared/constants';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class UserRpcController {

  constructor(private readonly _userService: UserService) {}

  @MessagePattern(MessagePatternEnum.SEARCH_USERNAME)
  getAllUsers(): Promise<UserEntity[]> {
    return this._userService.findAll();
  }

  @MessagePattern(MessagePatternEnum.FIND_USER_INFO)
  getUserInfo(id: string): Promise<UserEntity> {
    return this._userService.findOne(id);
  }

  @MessagePattern(MessagePatternEnum.UPDATE_USER)
  updateUser(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    return this._userService.update(id, updateUserDto);
  }
}
