import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthenticationResponseDto, CreateUserDto, SignInDto } from '@messaging-app/backend-shared/dtos';
import { UserEntity } from '@messaging-app/backend-shared/entities';
import { ConfigService } from '@nestjs/config';
import { compareSync, hash } from 'bcrypt';
import { JwtPayload, sign, verify } from 'jsonwebtoken';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly _configService: ConfigService,
    private readonly _userService: UserService
  ) {
  }

  async signUpUser(
    createUserDto: CreateUserDto
  ): Promise<AuthenticationResponseDto> {
    const saltRounds = this._configService.get<number>('SALT_ROUNDS');
    createUserDto.password = await hash(createUserDto.password, +saltRounds);

    try {
      const user = await this._userService.create(createUserDto);
      return this._getTokens(user);
    } catch (err: unknown) {
      console.log('internal server error during signup user.', err);
      throw err;
    }
  }

  async signInUser(signInDto: SignInDto): Promise<AuthenticationResponseDto> {
    const user = await this._userService.findByCredentialsOrFailed(signInDto);

    if (!compareSync(signInDto.password, user.password))
      throw new UnauthorizedException();
    return this._getTokens(user);
  }

  async validateToken(token: string): Promise<UserEntity> {
    const payload: JwtPayload = verify(token, this._configService.get<string>('JWT_SECRET')) as JwtPayload;
    return await this._userService.findByIdOrFailed(payload.userId);
  }

  private _getTokens(user: UserEntity): AuthenticationResponseDto {
    const payload = { sub: user.id, username: user.username };
    const secret = this._configService.get<string>('JWT_SECRET');
    const accessToken = sign(payload, secret, { expiresIn: '60m' });
    const refreshToken = sign(payload, secret, { expiresIn: '2 days' });
    return { accessToken, refreshToken };
  }
}
