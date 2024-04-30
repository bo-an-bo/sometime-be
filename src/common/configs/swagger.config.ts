import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as process from 'node:process';

import { AuthModule } from '../../auth/auth.module';
import { EventModule } from '../../event/event.module';
import { GroupModule } from '../../group/group.module';
import { MemberModule } from '../../member/member.module';
import { TransactionModule } from '../../transaction/transaction.module';
import { UserModule } from '../../user/user.module';

export const swaggerConfig = (app: INestApplication<any>) => {
  const config = new DocumentBuilder()
    .setTitle('sometime API')
    .addTag('Group', '모임 관련 API')
    .addTag('Member', '모임 회원 관련 API')
    .addTag('Event', '이벤트 관련 API')
    .addTag('Transaction', '거래 내역 관련 API')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    include: [GroupModule, MemberModule, EventModule, TransactionModule],
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
    .addTag('Transaction', '거래 내역 관련 API')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('dev', app, document);
};

export const authSwaggerConfig = (app: INestApplication<any>) => {
  const authorizationUrl = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.KAKAO_REST_API_KEY}&redirect_uri=${process.env.KAKAO_REDIRECT_URI}&response_type=code`;
  const config = new DocumentBuilder()
    .setTitle('sometime API')
    .addTag('Auth', 'OAuth 인증 관련 API')
    .addTag('User', '사용자 관련 API')
    .addOAuth2({
      type: 'oauth2',
      flows: {
        authorizationCode: {
          authorizationUrl,
          tokenUrl: 'https://kauth.kakao.com/oauth/token',
          scopes: undefined,
        },
      },
    })
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    include: [AuthModule, UserModule],
  });
  SwaggerModule.setup('auth', app, document);
};
