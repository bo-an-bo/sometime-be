import { Injectable } from '@nestjs/common';
import { GroupRepository } from './group.repository';
import { CreateGroupDto } from './dto/create-group.dto';
import { Group } from './entities/group.entity';
import { UpdateGroupDto } from './dto/update-group.dto';

@Injectable()
export class GroupService {
  constructor(private readonly groupRepository: GroupRepository) {}

  async create(createGroupDto: CreateGroupDto): Promise<Group> {
    return (await this.groupRepository.create(createGroupDto)) as Group;
  }

  async findAll(): Promise<Group[]> {
    return (await this.groupRepository.findAll()) as Group[];
  }

  async findOne(id: string): Promise<Group> {
    return (await this.groupRepository.findOne(id)) as Group;
  }

  async update(id: string, updateGroupDto: UpdateGroupDto): Promise<Group> {
    return (await this.groupRepository.update(id, updateGroupDto)) as Group;
  }

  async delete(id: string): Promise<void> {
    return this.groupRepository.delete(id);
  }

  async deleteAll(): Promise<void> {
    return this.groupRepository.deleteAll();
  }
}
