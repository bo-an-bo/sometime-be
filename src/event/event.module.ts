import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { eventProviders } from './event.providers';
import { EventRepository } from './event.repository';
import { EventService } from './event.service';

@Module({
  imports: [DatabaseModule],
  providers: [EventService, ...eventProviders, EventRepository],
  exports: [EventService],
})
export class EventModule {}
