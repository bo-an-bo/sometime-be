import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as process from 'process';

import { AppModule } from './app.module';
import {
  authSwaggerConfig,
  devSwaggerConfig,
  swaggerConfig,
} from './common/configs/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  swaggerConfig(app);
  devSwaggerConfig(app);
  authSwaggerConfig(app);
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  await app.listen(process.env.SERVER_PORT);
}

bootstrap().then(() => {
  console.log(
    `Server running on http://localhost:${process.env.SERVER_PORT}/api`,
  );
  console.log(
    `Dev server running on http://localhost:${process.env.SERVER_PORT}/dev`,
  );
  console.log(
    `Auth server running on http://localhost:${process.env.SERVER_PORT}/auth`,
  );
});
