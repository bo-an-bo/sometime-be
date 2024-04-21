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

  create(groupId: string, createEventDto: CreateEventDto) {
    return { groupId, event: this.eventRepository.create(createEventDto) };
  }

  async findAll(groupId: string) {
    const group = await this.groupService.findOne(groupId);
    return {
      groupId,
      events: group.events,
    };
  }

  findOne(groupId: string, eventId: string) {
    const group = this.groupService.findOne(groupId);
    const event = this.eventRepository.findOne(eventId);
    return {
      groupId,
      group,
      eventId,
      event,
    };
  }

  update(groupId: string, eventId: string, updateEventDto: UpdateEventDto) {
    return {
      groupId,
      eventId,
      event: this.eventRepository.update(eventId, updateEventDto),
    };
  }

  remove(groupId: string, eventId: string) {
    const group = this.groupService.findOne(groupId);
    return this.eventRepository.delete(eventId);
  }
}
