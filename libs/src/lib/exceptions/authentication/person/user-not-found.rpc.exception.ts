import { RpcException } from '@nestjs/microservices';
import { PersonErrorCodesEnum } from './person-error-codes.enum';

export class UserNotFoundRpcException extends RpcException {
  constructor(errorMessage: string) {
    super({
      errorCode: PersonErrorCodesEnum.USER_NOT_FOUND,
      errorMessage
    });
  }
}
