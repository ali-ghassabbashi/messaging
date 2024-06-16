import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { map, Observable } from 'rxjs';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class SerializerInterceptor implements NestInterceptor {
  constructor(private readonly _dto: any) {
  }

  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(map((data: any) => {
      return plainToInstance(this._dto, data);
    }));
  }
}
