import { Injectable } from '@nestjs/common';

import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group } from './entities/group.entity';
import { GroupRepository } from './group.repository';

@Injectable()
export class GroupService {
  constructor(private readonly groupRepository: GroupRepository) {}

  async create(createGroupDto: CreateGroupDto): Promise<Group> {
    return (await this.groupRepository.create(createGroupDto)) as Group;
  }

  async addMember(groupId: string, memberIds: string[]): Promise<Group> {
    const group = (await this.groupRepository.findOne(groupId)) as Group;
    for (const memberId of memberIds) {
      group.members.push(memberId);
    }
    await this.groupRepository.update(groupId, group);
    return group;
  }

  async addEvent(groupId: string, eventId: string): Promise<Group> {
    const group = (await this.groupRepository.findOne(groupId)) as Group;
    group.events.push(eventId);
    await this.groupRepository.update(groupId, group);
    return group;
  }

  async findAll(): Promise<Group[]> {
    return (await this.groupRepository.findAll()) as Group[];
  }

  async findOne(groupId: string): Promise<Group> {
    return (await this.groupRepository.findOne(groupId)) as Group;
  }

  async update(
    groupId: string,
    updateGroupDto: UpdateGroupDto,
  ): Promise<Group> {
    return (await this.groupRepository.update(groupId, {
      name: updateGroupDto.name,
      description: updateGroupDto.description,
    } as UpdateGroupDto)) as Group;
  }

  async delete(groupId: string): Promise<void> {
    return this.groupRepository.delete(groupId);
  }

  async deleteMembers(groupId: string, memberIds: string[]): Promise<void> {
    const group = (await this.groupRepository.findOne(groupId)) as Group;
    const groupMembers = group.members;

    group.members = groupMembers.filter(
      (member) => !memberIds.find((id) => id === member),
    );

    await this.groupRepository.update(groupId, group);
  }

  async deleteEvent(groupId: string, eventId: string): Promise<void> {
    const group = (await this.groupRepository.findOne(groupId)) as Group;
    const groupEvents = group.events;

    group.events = groupEvents.filter((event) => event !== eventId);

    await this.groupRepository.update(groupId, group);
  }

  async deleteAll(): Promise<void> {
    return this.groupRepository.deleteAll();
  }
}
