import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EventRepository } from './event.repository';
import { GroupService } from '../group/group.service';

@Injectable()
export class EventService {
  constructor(
    private readonly eventRepository: EventRepository,
    private readonly groupService: GroupService,
  ) {}

  async create(groupId: string, createEventDto: CreateEventDto) {
    const createdEvent = await this.eventRepository.create(createEventDto);
    await this.groupService.addEvent(groupId, createdEvent.id);

    return createdEvent;
  }

  async findAll(groupId: string) {
    const group = await this.groupService.findOne(groupId);

    const events = [];
    for (const eventId of group.events) {
      events.push(await this.eventRepository.findOne(eventId));
    }

    return events;
  }

  async findOne(groupId: string, eventId: string) {
    const group = await this.groupService.findOne(groupId);
    const event = await this.eventRepository.findOne(eventId);

    return {
      group,
      event,
    };
  }

  async update(
    groupId: string,
    eventId: string,
    updateEventDto: UpdateEventDto,
  ) {
    const group = await this.groupService.findOne(groupId);
    const event = await this.eventRepository.findOne(eventId);

    for (const key in updateEventDto) {
      event[key] = updateEventDto[key];
    }
    await this.eventRepository.update(eventId, event);

    return {
      group,
      event,
    };
  }

  async remove(groupId: string, eventId: string) {
    return await this.groupService.deleteEvent(groupId, eventId);
  }
}
