import { Inject, Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Model } from 'mongoose';
import { Group } from './interfaces/group.interface';

@Injectable()
export class GroupService {
  constructor(
    @Inject('GROUP_MODEL')
    private readonly groupModel: Model<Group>,
  ) {}

  create(createGroupDto: CreateGroupDto) {
    return new this.groupModel(createGroupDto).save();
  }

  async findAll(): Promise<Group[]> {
    return this.groupModel.find().exec();
  }

  removeAll() {
    return this.groupModel.deleteMany({});
  }

  async findOne(id: string): Promise<Group> {
    return this.groupModel.findById(id).exec();
  }

  async update(id: string, updateGroupDto: UpdateGroupDto): Promise<Group> {
    try {
      const group = await this.groupModel.findById(id).exec();
      group.name = updateGroupDto.name;
      group.description = updateGroupDto.description;
      return group.save();
    } catch (e) {
      return null;
    }
  }

  async remove(id: string): Promise<Group> {
    return this.groupModel.findByIdAndDelete(id);
  }
}
