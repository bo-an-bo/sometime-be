import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const swaggerConfig = (app: INestApplication<any>) => {
  const config = new DocumentBuilder()
    .setTitle('sometime API')
    .addTag('Group', '모임 관련 API')
    .addTag('Member', '모임 회원 관련 API')
    .addTag('Event', '이벤트 관련 API')
    .addTag('Auth', 'OAuth 인증 관련 API')
    .addTag('User', '사용자 관련 API')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
};
