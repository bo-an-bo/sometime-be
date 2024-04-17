import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventService {
  create(createEventDto: CreateEventDto) {
    return createEventDto;
  }

  findAll() {
    return `This action returns all event`;
  }

  findOne(groupId: string, eventId: string) {
    return {
      groupId,
      eventId,
    };
  }

  update(eventId: number, updateEventDto: UpdateEventDto) {
    return `This action updates a #${eventId} event` + updateEventDto;
  }

  remove(eventId: number) {
    return `This action removes a #${eventId} event`;
  }
}
