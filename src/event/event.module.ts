import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { DatabaseModule } from '../database/database.module';
import { EventRepository } from './event.repository';
import { eventProviders } from './event.providers';
import { GroupModule } from '../group/group.module';

@Module({
  imports: [DatabaseModule, GroupModule],
  controllers: [EventController],
  providers: [EventService, ...eventProviders, EventRepository],
})
export class EventModule {}
