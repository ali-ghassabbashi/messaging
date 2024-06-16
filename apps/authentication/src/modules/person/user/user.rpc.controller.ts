import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from '@messaging-app/backend-shared/dtos';
import { MessagePatternEnum } from '@messaging-app/backend-shared/constants';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class UserRpcController {
  constructor(private readonly _userService: UserService) {
  }

  @MessagePattern(MessagePatternEnum.SEARCH_USERNAME)
  async searchByUsername(@Payload() searchString: string): Promise<string> {
    return JSON.stringify(
      await this._userService.searchByUsername(searchString)
    );
  }

  @MessagePattern(MessagePatternEnum.FIND_USER_INFO)
  async getUserInfo(@Payload() id: string): Promise<string> {
    return JSON.stringify(await this._userService.findOne(id));
  }

  @MessagePattern(MessagePatternEnum.UPDATE_USER)
  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<string> {
    return JSON.stringify(await this._userService.update(id, updateUserDto));
  }
}
