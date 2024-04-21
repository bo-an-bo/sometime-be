import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Event } from './interfaces/event.interface';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventRepository {
  constructor(
    @Inject('EVENT_MODEL')
    private readonly eventModel: Model<Event>,
  ) {}

  create(createEventDto: CreateEventDto): Promise<Event> {
    return this.eventModel.create(createEventDto);
  }

  findAll(): Promise<Event[]> {
    return this.eventModel.find().exec();
  }

  findOne(eventId: string): Promise<Event> {
    return this.eventModel.findById(eventId).exec();
  }

  update(eventId: string, updateEventDto: CreateEventDto): Promise<Event> {
    return this.eventModel
      .findByIdAndUpdate(eventId, updateEventDto, { new: true })
      .exec();
  }

  delete(eventId: string) {
    this.eventModel.findByIdAndDelete(eventId);
  }
}
