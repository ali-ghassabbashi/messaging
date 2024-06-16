import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthClientService } from '../modules/auth-client/auth-client.service';
import { UserEntity } from '../entities/authentication/perosn/user.entity';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      validatedUser?: UserEntity;
    }
  }
}

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private readonly _authService: AuthClientService) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { authentication } = request.headers;
    const user = await this._authService.validateToken(authentication);
    if (!user) throw new UnauthorizedException('invalid token!');
    console.log('this is from guard', user);
    request.validatedUser = user;
    return true;
  }

}
