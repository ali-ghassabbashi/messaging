import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { UserEntity } from '../../entities/authentication';
import { CreateUserDto, AuthenticationResponseDto, SignInDto, UpdateUserDto } from '../../dtos/authentication';
import { ClientKafka } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';


@Injectable()
export class AuthClientService implements OnModuleInit {

  constructor(@Inject('AUTH_CLIENT') private readonly _client: ClientKafka) {}
  
  onModuleInit() {
    ['searchUsername', 'findUserInfo', 'signupUser', 'signinUser', 'updateUser'].forEach(pattern => this._client.subscribeToResponseOf(pattern))
  }

  findByUsername(username: string): Promise<string[]> {
    return firstValueFrom<string[]>(this._client.send('searchUsername', { username }));
  }

  findOne(id: string): Promise<UserEntity> {
    return firstValueFrom<UserEntity>(this._client.send('findUserInfo', { id }));
  }

  signup(createUserDto: CreateUserDto): Promise<AuthenticationResponseDto> {
    return firstValueFrom<AuthenticationResponseDto>(this._client.send('signupUser', createUserDto));
  }

  signin(signInDto: SignInDto): Promise<AuthenticationResponseDto> {
    return firstValueFrom<AuthenticationResponseDto>(this._client.send('signinUser', { signInDto }));
  }

  update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    return firstValueFrom<UserEntity>(this._client.send('updateUser', { id, updateUserDto }));
  }
}
