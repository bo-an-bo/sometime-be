import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { GroupModule } from '../group/group.module';
import { EventController } from './event.controller';
import { eventProviders } from './event.providers';
import { EventRepository } from './event.repository';
import { EventService } from './event.service';

@Module({
  imports: [DatabaseModule, GroupModule],
  controllers: [EventController],
  providers: [EventService, ...eventProviders, EventRepository],
})
export class EventModule {}
