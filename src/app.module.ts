import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { EventModule } from './event/event.module';
import { GroupModule } from './group/group.module';
import { MemberModule } from './member/member.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GroupModule,
    MemberModule,
    EventModule,
    AuthModule,
    UserModule,
  ],
})
export class AppModule {}
