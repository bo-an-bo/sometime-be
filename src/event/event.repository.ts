import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { CreateEventDto } from './dto/create-event.dto';
import { Event } from './interfaces/event.interface';

@Injectable()
export class EventRepository {
  constructor(
    @Inject('EVENT_MODEL')
    private readonly eventModel: Model<Event>,
  ) {}

  create(createEventDto: CreateEventDto): Promise<Event> {
    return this.eventModel.create(createEventDto);
  }

  findOne(eventId: string): Promise<Event> {
    return this.eventModel.findById(eventId).exec();
  }

  update(eventId: string, event: Event): Promise<Event> {
    return this.eventModel
      .findByIdAndUpdate(eventId, event, { new: true })
      .exec();
  }

  delete(eventId: string) {
    this.eventModel.findByIdAndDelete(eventId).exec();
  }
}
