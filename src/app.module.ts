import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { GroupModule } from './group/group.module';
import { AuthModule } from './auth/auth.module';
import { TransactionModule } from './transaction/transaction.module';
import { MemberModule } from './member/member.module';
import { ConfigModule } from '@nestjs/config';
import { EventModule } from './event/event.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    GroupModule,
    AuthModule,
    TransactionModule,
    MemberModule,
    EventModule,
  ],
})
export class AppModule {}
