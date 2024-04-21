import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './interfaces/event.interface';

@Injectable()
export class EventRepository {
  constructor(
    @Inject('EVENT_MODEL')
    private readonly eventModel: Model<Event>,
  ) {}

  async create(createEventDto: CreateEventDto): Promise<Event> {
    return await this.eventModel.create(createEventDto);
  }

  findAll(): Promise<Event[]> {
    return this.eventModel.find().exec();
  }

  async findOne(eventId: string): Promise<Event> {
    return await this.eventModel.findById(eventId).exec();
  }

  update(eventId: string, updateEventDto: UpdateEventDto): Promise<Event> {
    return this.eventModel
      .findByIdAndUpdate(eventId, updateEventDto, { new: true })
      .exec();
  }

  delete(eventId: string) {
    this.eventModel.findByIdAndDelete(eventId);
  }
}
