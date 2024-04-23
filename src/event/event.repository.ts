import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { CreateEventDto } from './dto/create-event.dto';
import { Event } from './entities/event.entity';
import { EventInterface } from './interfaces/event.interface';

@Injectable()
export class EventRepository {
  constructor(
    @Inject('EVENT_MODEL')
    private readonly eventModel: Model<EventInterface>,
  ) {}

  create(createEventDto: CreateEventDto): Promise<Event> {
    return this.eventModel.create(createEventDto) as Promise<Event>;
  }

  findOne(eventId: string): Promise<Event> {
    return this.eventModel.findById(eventId).exec() as Promise<Event>;
  }

  update(eventId: string, event: Event): Promise<Event> {
    return this.eventModel
      .findByIdAndUpdate(eventId, event, { new: true })
      .exec() as Promise<Event>;
  }

  delete(eventId: string) {
    this.eventModel.findByIdAndDelete(eventId).exec().then();
  }
}
