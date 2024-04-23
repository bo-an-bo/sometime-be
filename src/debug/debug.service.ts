import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { Event } from '../event/interfaces/event.interface';
import { GroupInterface } from '../group/interfaces/group.interface';
import { MemberInterface } from '../member/interfaces/member.interface';

@Injectable()
export class DebugService {
  constructor(
    @Inject('GROUP_MODEL')
    private readonly groupModel: Model<GroupInterface>,
    @Inject('MEMBER_MODEL')
    private readonly memberModel: Model<MemberInterface>,
    @Inject('EVENT_MODEL')
    private readonly eventModel: Model<Event>,
  ) {}

  async findAll() {
    return {
      groups: await this.findAllGroups(),
      members: await this.findAllMembers(),
      events: await this.findAllEvents(),
    };
  }

  findAllGroups() {
    return this.groupModel.find().exec();
  }

  findAllMembers() {
    return this.memberModel.find().exec();
  }

  findAllEvents() {
    return this.eventModel.find().exec();
  }

  async deleteAll() {
    return {
      groups: await this.deleteGroups(),
      members: await this.deleteMembers(),
      events: await this.deleteEvents(),
    };
  }

  deleteGroups() {
    return this.groupModel.deleteMany({}).exec();
  }

  deleteMembers() {
    return this.memberModel.deleteMany({}).exec();
  }

  deleteEvents() {
    return this.eventModel.deleteMany({}).exec();
  }

  parse(body: any) {
    return JSON.parse(body);
  }
}
