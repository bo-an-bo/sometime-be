import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group } from './entities/group.entity';
import { GroupInterface } from './interfaces/group.interface';

@Injectable()
export class GroupRepository {
  constructor(
    @Inject('GROUP_MODEL')
    private readonly groupModel: Model<GroupInterface>,
  ) {}

  create(createGroupDto: CreateGroupDto): Promise<Group> {
    return this.groupModel.create(createGroupDto) as Promise<Group>;
  }

  findAll(): Promise<Group[]> {
    return this.groupModel.find().exec() as Promise<Group[]>;
  }

  findByIds(groupIds: string[]): Promise<Group[]> {
    return this.groupModel.find({ _id: { $in: groupIds } }).exec() as Promise<Group[]>;
  }

  findOne(groupId: string): Promise<Group> {
    return this.groupModel.findById(groupId).exec() as Promise<Group>;
  }

  update(groupId: string, updateGroupDto: UpdateGroupDto): Promise<Group> {
    return this.groupModel.findByIdAndUpdate(groupId, updateGroupDto, { new: true }).exec() as Promise<Group>;
  }

  delete(groupId: string) {
    this.groupModel.findByIdAndDelete(groupId).exec().then();
  }
}
