import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { UserEntity } from '../../entities/authentication';
import { CreateUserDto, AuthenticationResponseDto, SignInDto, UpdateUserDto } from '../../dtos/authentication';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { MessagePatternEnum } from '../../constants/enums/message-patterns.enum';


@Injectable()
export class AuthClientService implements OnModuleInit {

  constructor(@Inject('AUTH_CLIENT') private readonly _client: ClientKafka) {}
  
  onModuleInit() {
    Object.values(MessagePatternEnum).forEach(pattern => this._client.subscribeToResponseOf(pattern))
  }

  findByUsername(username: string): Promise<string[]> {
    return firstValueFrom<string[]>(this._client.send(MessagePatternEnum.SEARCH_USERNAME, { username }));
  }

  findOne(id: string): Promise<UserEntity> {
    return firstValueFrom<UserEntity>(this._client.send(MessagePatternEnum.FIND_USER_INFO, { id }));
  }

  async signup(createUserDto: CreateUserDto): Promise<AuthenticationResponseDto> {
    return firstValueFrom<AuthenticationResponseDto>(
      this._client.send(MessagePatternEnum.SIGNUP_USER, createUserDto)
    );
  }

  signin(signInDto: SignInDto): Promise<AuthenticationResponseDto> {
    return firstValueFrom<AuthenticationResponseDto>(
      this._client.send(MessagePatternEnum.SIGNIN_USER, signInDto)
    );
  }

  update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    return firstValueFrom<UserEntity>(
      this._client.send(MessagePatternEnum.UPDATE_USER, { id, updateUserDto })
    );
  }
}
