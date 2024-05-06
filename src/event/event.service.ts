import { Injectable } from '@nestjs/common';

import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventRepository } from './event.repository';

@Injectable()
export class EventService {
  constructor(private readonly eventRepository: EventRepository) {}

  async create(createEventDto: CreateEventDto) {
    return (await this.eventRepository.create(createEventDto)).id;
  }

  async getOne(eventId: string) {
    return await this.eventRepository.findOne(eventId);
  }

  async update(eventId: string, updateEventDto: UpdateEventDto) {
    const event = await this.eventRepository.findOne(eventId);

    for (const key in updateEventDto) {
      event[key] = updateEventDto[key];
    }
    await this.eventRepository.update(eventId, event);

    return event;
  }

  async compareEventTransactions(groupId: string, eventId: string) {
    return await this.eventRepository.compareTransaction(groupId, eventId);
  }

  delete(eventId: string) {
    return this.eventRepository.delete(eventId);
  }
}
