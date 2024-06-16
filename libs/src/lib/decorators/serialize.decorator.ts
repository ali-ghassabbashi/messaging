import { UseInterceptors } from '@nestjs/common';
import { SerializerInterceptor } from '../interceptors';

interface ClassConstructor {
  new (...args: any[]): {};
}

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializerInterceptor(dto));
}
