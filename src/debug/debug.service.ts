import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { Group } from '../group/interfaces/group.interface';

@Injectable()
export class DebugService {
  constructor(
    @Inject('GROUP_MODEL')
    private readonly groupModel: Model<Group>,
    @Inject('MEMBER_MODEL')
    private readonly memberModel: Model<Group>,
    @Inject('EVENT_MODEL')
    private readonly eventModel: Model<Group>,
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
