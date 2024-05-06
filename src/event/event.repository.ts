import { Inject, Injectable } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';

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
    if (mongoose.Types.ObjectId.isValid(eventId)) {
      return this.eventModel.findById(eventId).exec() as Promise<Event>;
    }
  }

  compareTransaction(groupId: string, eventId: string) {
    const query = [
      { $match: { _id: new mongoose.Types.ObjectId(eventId) } },
      { $unwind: '$attendees' },
      {
        $addFields: {
          attendeesObjectId: { $toObjectId: '$attendees' },
        },
      },
      {
        $lookup: {
          from: 'members',
          localField: 'attendeesObjectId',
          foreignField: '_id',
          as: 'member_info',
        },
      },
      { $unwind: '$member_info' },
      {
        $lookup: {
          from: 'transactions',
          let: {
            startDate: '$transactionStartDate',
            endDate: '$transactionEndDate',
            member_name: '$member_info.name',
            fee_amount: '$fee',
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $gte: ['$timestamp', '$$startDate'] },
                    { $lt: ['$timestamp', '$$endDate'] },
                    { $eq: ['$metadata.groupId', groupId] },
                    { $eq: ['$metadata.name', '$$member_name'] },
                    { $eq: ['$metadata.amount', '$$fee_amount'] },
                  ],
                },
              },
            },
          ],
          as: 'transaction_info',
        },
      },
      {
        $addFields: {
          isPaid: { $gt: [{ $size: '$transaction_info' }, 0] },
        },
      },
      {
        $project: {
          _id: 0,
          members: '$member_info',
          isPaid: 1,
        },
      },
    ];

    return this.eventModel.aggregate(query).exec();
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
