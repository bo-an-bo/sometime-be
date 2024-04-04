import { Inject, Injectable } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group } from './entities/group.entity';
import { Model } from 'mongoose';

@Injectable()
export class GroupService {
  constructor(
    @Inject('GROUP_MODEL')
    private readonly groupModel: Model<Group>,
  ) {}

  create(createGroupDto: CreateGroupDto) {
    return this.groupModel.create(createGroupDto);
  }

  findAll() {
    return this.groupModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} group`;
  }

  update(id: number, updateGroupDto: UpdateGroupDto) {
    return { id, updateGroupDto };
  }

  remove(id: number) {
    return `This action removes a #${id} group`;
  }
}
