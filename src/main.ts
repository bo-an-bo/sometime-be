import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as process from 'process';

import { AppModule } from './app.module';
import { swaggerConfig } from './common/configs/swagger.config';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  swaggerConfig(app);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
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
