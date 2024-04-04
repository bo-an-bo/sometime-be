import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { GroupModule } from './group/group.module';
import { AuthModule } from './auth/auth.module';
import { TransactionModule } from './transaction/transaction.module';
import { MemberModule } from './member/member.module';

@Module({
  imports: [
    UserModule,
    GroupModule,
    AuthModule,
    TransactionModule,
    MemberModule,
  ],
})
export class AppModule {}
