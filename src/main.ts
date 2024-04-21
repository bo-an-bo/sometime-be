import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as process from 'process';

import { AppModule } from './app.module';
import { configSwagger } from './config.swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  configSwagger(app);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(process.env.SERVER_PORT);
}

bootstrap().then(() => {
  console.log(
    `Server running on http://localhost:${process.env.SERVER_PORT}/api`,
  );
});
