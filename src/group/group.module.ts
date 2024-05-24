import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { EventModule } from '../event/event.module';
import { MemberModule } from '../member/member.module';
import { TransactionModule } from '../transaction/transaction.module';
import { UserModule } from '../user/user.module';
import { GroupController } from './group.controller';
import { groupProviders } from './group.providers';
import { GroupRepository } from './group.repository';
import { GroupService } from './group.service';

@Module({
  imports: [DatabaseModule, MemberModule, EventModule, TransactionModule, UserModule],
  controllers: [GroupController],
  providers: [GroupService, ...groupProviders, GroupRepository],
  exports: [GroupService],
})
export class GroupModule {}
