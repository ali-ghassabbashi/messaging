import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity, CreateUserDto, UpdateUserDto } from '@messaging-app/backend-shared';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class UserController {

  constructor(private readonly _userService: UserService) {}

  @MessagePattern('searchUsername')
  getAllUsers(): Promise<UserEntity[]> {
    return this._userService.findAll();
  }

  @MessagePattern('findUserInfo')
  getUserInfo(id: string): Promise<UserEntity> {
    return this._userService.findOne(id);
  }

  @MessagePattern('signupUser')
  createUser(@Payload() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this._userService.create(createUserDto);
  }

  @MessagePattern('updateUser')
  updateUser(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    return this._userService.update(id, updateUserDto);
  }
}
