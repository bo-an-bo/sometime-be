import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { Group } from './interfaces/group.interface';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

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

  findOne(id: string): Promise<Group> {
    return this.groupModel.findById(id).exec();
  }

  update(id: string, updateGroupDto: UpdateGroupDto): Promise<Group> {
    return this.groupModel
      .findByIdAndUpdate(id, updateGroupDto, { new: true })
      .exec();
  }

  delete(id: string) {
    this.groupModel.findByIdAndDelete(id);
  }

  deleteAll() {
    this.groupModel.deleteMany({}).exec();
  }
}
