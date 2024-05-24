import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { eventProviders } from '../event/event.providers';
import { groupProviders } from '../group/group.providers';
import { memberProviders } from '../member/member.providers';
import { DebugController } from './debug.controller';
import { DebugService } from './debug.service';

@Module({
  imports: [DatabaseModule],
  controllers: [DebugController],
  providers: [DebugService, ...groupProviders, ...memberProviders, ...eventProviders],
})
export class DebugModule {}
