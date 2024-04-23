import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { EventModule } from '../../event/event.module';
import { GroupModule } from '../../group/group.module';
import { MemberModule } from '../../member/member.module';
import { UserModule } from '../../user/user.module';

export const swaggerConfig = (app: INestApplication<any>) => {
  const config = new DocumentBuilder()
    .setTitle('sometime API')
    .addTag('Group', '모임 관련 API')
    .addTag('Member', '모임 회원 관련 API')
    .addTag('Event', '이벤트 관련 API')
    .addTag('Auth', 'OAuth 인증 관련 API')
    .addTag('User', '사용자 관련 API')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    include: [GroupModule, MemberModule, EventModule, UserModule],
  });
  SwaggerModule.setup('api', app, document);
};

export const devSwaggerConfig = (app: INestApplication<any>) => {
  const config = new DocumentBuilder()
    .setTitle('sometime API')
    .addTag('Debug', '개발용 API')
    .addTag('Group', '모임 관련 API')
    .addTag('Member', '모임 회원 관련 API')
    .addTag('Event', '이벤트 관련 API')
    .addTag('Auth', 'OAuth 인증 관련 API')
    .addTag('User', '사용자 관련 API')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('dev', app, document);
};
