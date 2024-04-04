import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configSwagger } from './config.swagger';
import * as process from 'process';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  configSwagger(app);

  app.enableCors();
  await app.listen(process.env.SERVER_PORT);
}

bootstrap().then(() => {
  console.log(
    `Server running on http://localhost:${process.env.SERVER_PORT}/api`,
  );
});
