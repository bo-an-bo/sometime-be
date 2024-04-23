import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group } from './interfaces/group.interface';

@Injectable()
export class GroupRepository {
  constructor(
    @Inject('GROUP_MODEL')
    private readonly groupModel: Model<Group>,
  ) {}

  create(createGroupDto: CreateGroupDto): Promise<Group> {
    return this.groupModel.create(createGroupDto);
  }

  findAll(): Promise<Group[]> {
    return this.groupModel.find().exec();
  }

  findOne(groupId: string): Promise<Group> {
    return this.groupModel.findById(groupId).exec();
  }

  update(groupId: string, updateGroupDto: UpdateGroupDto): Promise<Group> {
    return this.groupModel
      .findByIdAndUpdate(groupId, updateGroupDto, { new: true })
      .exec();
  }

  delete(groupId: string) {
    this.groupModel.findByIdAndDelete(groupId).exec();
  }
}
