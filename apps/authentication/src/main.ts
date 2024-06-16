/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { sharedMain } from '@messaging-app/backend-shared/modules';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await sharedMain(app, 'auth-consumer', {
    title: 'authentication service!',
    description: 'This is the documentation of authentication service.',
    tag: 'auth'
  });

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
