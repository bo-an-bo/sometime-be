import { Module } from '@nestjs/common';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { groupProvider } from './group.provider';
import { DatabaseModule } from '../database/database.module';
import { GroupRepository } from './group.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [GroupController],
  providers: [GroupService, ...groupProvider, GroupRepository],
  exports: [GroupService],
})
export class GroupModule {}
