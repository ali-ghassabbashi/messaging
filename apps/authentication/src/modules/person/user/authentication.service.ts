import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthenticationResponseDto, CreateUserDto, SignInDto, UserEntity } from '@messaging-app/backend-shared';
import { ConfigService } from '@nestjs/config';
import { compareSync, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';

@Injectable()
export class AuthenticationService {

  constructor(
    private readonly _configService: ConfigService,
    private readonly _userService: UserService
  ) {}
  
  async signUpUser(createUserDto: CreateUserDto): Promise<AuthenticationResponseDto> {

    const saltRounds = this._configService.get<number>('SALT_ROUNDS');
    const hashedPassword = await hash(createUserDto.password, +saltRounds);
    createUserDto.password = hashedPassword;

    try {
      const user = await this._userService.create(createUserDto);
      return this._getTokens(user);
    } catch(err: unknown) {
      console.log('internal server error during signup user.', err);
      throw err;
    }
  }

  async signInUser(signInDto: SignInDto): Promise<AuthenticationResponseDto> {
    const user = await this._userService.findByCredentialsOrFailed(signInDto);

    if(!compareSync(signInDto.password, user.password)) throw new UnauthorizedException();
    return this._getTokens(user);
  }

  private _getTokens(user: UserEntity): {accessToken: string, refreshToken: string} {
    const payload = {sub: user.id, username: user.username};
    const secret = this._configService.get<string>('JWT_SECRET');
    const accessToken = sign(payload, secret, { expiresIn: '60m'});
    const refreshToken = sign(payload, secret, { expiresIn: '2 days'});
    return {accessToken, refreshToken};
  }
}
