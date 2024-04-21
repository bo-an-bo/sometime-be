import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { GroupController } from './group.controller';
import { groupProvider } from './group.provider';
import { GroupRepository } from './group.repository';
import { GroupService } from './group.service';

@Module({
  imports: [DatabaseModule],
  controllers: [GroupController],
  providers: [GroupService, ...groupProvider, GroupRepository],
  exports: [GroupService],
})
export class GroupModule {}
