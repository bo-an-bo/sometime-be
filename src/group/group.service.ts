import { Injectable } from '@nestjs/common';
import mongoose from 'mongoose';

import { CreateEventDto } from '../event/dto/create-event.dto';
import { UpdateEventDto } from '../event/dto/update-event.dto';
import { EventService } from '../event/event.service';
import { CreateMemberDto } from '../member/dto/create-member.dto';
import { UpdateMemberDto } from '../member/dto/update-member.dto';
import { MemberService } from '../member/member.service';
import { GetTransactionsPeriodDto } from '../transaction/dto/get-transaction-period-dto';
import { TransactionService } from '../transaction/transaction.service';
import { UserService } from '../user/user.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group } from './entities/group.entity';
import { GroupRepository } from './group.repository';
import { GroupValidator } from './group.validator';

@Injectable()
export class GroupService {
  constructor(
    private readonly groupRepository: GroupRepository,
    private readonly memberService: MemberService,
    private readonly eventService: EventService,
    private readonly transactionService: TransactionService,
    private readonly userService: UserService,
    private readonly groupValidator: GroupValidator,
  ) {}

  async create(userId: string, createGroupDto: CreateGroupDto, memberExcel: Express.Multer.File): Promise<Group> {
    const group: Group = createGroupDto as Group;
    group.auth = {
      owner: userId,
      editors: [],
      viewers: [],
    };

    if (memberExcel) {
      group.members = await this.memberService.uploadMemberFile(memberExcel);
    }

    const createdGroup = await this.groupRepository.create(group);
    await this.userService.pushOwner(userId, createdGroup.id);

    return createdGroup;
  }

  async addMember(userId: string, groupId: string, createMemberDto: CreateMemberDto[]): Promise<Group> {
    const group = await this.groupRepository.findOne(groupId);
    this.groupValidator.validateGroupEditor(group, userId);

    for (const member of createMemberDto) {
      group.members.push(await this.memberService.create(member));
    }

    await this.groupRepository.update(groupId, group);

    return group;
  }

  async addMemberToEvent(userId: string, groupId: string, eventId: string, memberIds: string[]) {
    const group = await this.groupRepository.findOne(groupId);
    this.groupValidator.validateGroupEditor(group, userId);

    const event = await this.eventService.getOne(eventId);

    for (const member of memberIds) {
      if (!group.members.find((m) => m === member)) {
        throw new Error('멤버가 존재하지 않습니다.');
      }
      event.attendees.push(member);
    }

    await this.eventService.update(eventId, event);

    return event;
  }

  async uploadMemberFile(userId: string, groupId: string, memberExcel: Express.Multer.File): Promise<Group> {
    const group = await this.groupRepository.findOne(groupId);
    this.groupValidator.validateGroupEditor(group, userId);

    group.members = await this.memberService.uploadMemberFile(memberExcel);

    return await this.groupRepository.update(groupId, group);
  }

  async uploadTransactionFile(
    userId: string,
    groupId: string,
    transactionExcel: Express.Multer.File,
    password: string,
  ): Promise<void> {
    const group = await this.groupRepository.findOne(groupId);
    this.groupValidator.validateGroupEditor(group, userId);

    await this.transactionService.uploadTransactionFile(groupId, transactionExcel, password);
  }

  async addEvent(userId: string, groupId: string, createEventDto: CreateEventDto): Promise<object> {
    const group = await this.groupRepository.findOne(groupId);
    this.groupValidator.validateGroupEditor(group, userId);

    const eventId = await this.eventService.create(createEventDto);

    group.events.push(eventId);

    await this.groupRepository.update(groupId, group);
    return { eventId };
  }

  async getAll(userId: string): Promise<Group[]> {
    const user = await this.userService.getOne(userId);
    const groupIds = user.auth.owner.concat(user.auth.editor).concat(user.auth.viewer);

    return await this.groupRepository.findByIds(groupIds);
  }

  async getOne(userId: string, groupId: string): Promise<Group> {
    const group: Group = await this.groupRepository.findOne(groupId);
    this.groupValidator.validateGroupViewer(group, userId);

    const members = await this.getAllMembers(group.members);
    const events = await this.getAllEvents(group.events);

    group.members = members;
    group.events = events;

    return group;
  }

  async getMembers(userId: string, groupId: string) {
    const group = await this.groupRepository.findOne(groupId);
    this.groupValidator.validateGroupViewer(group, userId);

    const members = await this.getAllMembers(group.members);
    const memberInfo = [];
    if (group.members.length > 0) {
      for (const info in members[0].memberInfo) {
        memberInfo.push(info);
      }
    }

    return { memberInfo, members };
  }

  async getEvents(userId: string, groupId: string) {
    const group = await this.groupRepository.findOne(groupId);
    this.groupValidator.validateGroupViewer(group, userId);

    return await this.getAllEvents(group.events);
  }

  async getEvent(userId: string, groupId: string, eventId: string) {
    const group = await this.groupRepository.findOne(groupId);
    this.groupValidator.validateGroupViewer(group, userId);

    return this.eventService.getOne(eventId);
  }

  async getTransactions(userId: string, groupId: string) {
    const group = await this.groupRepository.findOne(groupId);
    this.groupValidator.validateGroupViewer(group, userId);

    return this.transactionService.getTransactions(groupId);
  }

  async getTransactionsByEvent(userId: string, groupId: string, eventId: string) {
    const group = await this.groupRepository.findOne(groupId);
    this.groupValidator.validateGroupViewer(group, userId);

    return this.eventService.compareEventTransactions(groupId, eventId);
  }

  async getTransactionsByPeriod(userId: string, groupId: string, periodDto: GetTransactionsPeriodDto) {
    const group = await this.groupRepository.findOne(groupId);
    this.groupValidator.validateGroupViewer(group, userId);

    return this.transactionService.getTransactionsByPeriod(groupId, periodDto.startDate, periodDto.endDate);
  }

  async update(userId: string, groupId: string, updateGroupDto: UpdateGroupDto): Promise<Group> {
    const group = await this.groupRepository.findOne(groupId);
    this.groupValidator.validateGroupEditor(group, userId);

    return await this.groupRepository.update(groupId, {
      name: updateGroupDto.name,
      description: updateGroupDto.description,
    } as UpdateGroupDto);
  }

  async updateMember(userId: string, groupId: string, memberId: string, updateMemberDto: UpdateMemberDto) {
    const group = await this.groupRepository.findOne(groupId);
    this.groupValidator.validateGroupEditor(group, userId);

    const member = await this.memberService.update(memberId, updateMemberDto);

    group.members = group.members.map((m) => (m === memberId ? member.id : m));

    await this.groupRepository.update(groupId, group);

    return member;
  }

  async updateEvent(userId: string, groupId: string, eventId: string, updateEventDto: UpdateEventDto) {
    const group = await this.groupRepository.findOne(groupId);
    this.groupValidator.validateGroupEditor(group, userId);

    const event = await this.eventService.update(eventId, updateEventDto);

    group.events = group.events.map((e) => (e === eventId ? event.id : e));

    await this.groupRepository.update(groupId, group);

    return event;
  }

  async delete(userId: string, groupId: string): Promise<void> {
    const group = await this.groupRepository.findOne(groupId);
    this.groupValidator.validateGroupOwner(group, userId);

    return this.groupRepository.delete(groupId);
  }

  async deleteMembers(userId: string, groupId: string, memberIds: string[]): Promise<void> {
    const group = await this.groupRepository.findOne(groupId);
    this.groupValidator.validateGroupEditor(group, userId);

    const groupMembers = group.members;
    for (const memberId of memberIds) {
      if (!mongoose.Types.ObjectId.isValid(memberId)) {
        throw new Error('유효하지 않은 ObjectId입니다.');
      }
      if (!groupMembers.includes(memberId)) {
        throw new Error('멤버가 존재하지 않습니다.');
      }
    }

    group.members = groupMembers.filter((member) => !memberIds.includes(member));
    this.memberService.deleteMany(memberIds);

    await this.groupRepository.update(groupId, group);
  }

  async deleteEvent(userId: string, groupId: string, eventId: string): Promise<void> {
    const group = await this.groupRepository.findOne(groupId);
    this.groupValidator.validateGroupEditor(group, userId);

    const groupEvents = group.events;

    group.events = groupEvents.filter((event) => event !== eventId);
    this.eventService.delete(eventId);

    await this.groupRepository.update(groupId, group);
  }

  async inviteEditor(senderId: string, groupId: string, receiverId: string) {
    const group = await this.groupRepository.findOne(groupId);
    this.groupValidator.validateGroupOwner(group, senderId);
    this.groupValidator.validateGroupInvite(group, receiverId);

    group.auth.editors.push(receiverId);
    await this.userService.pushEditor(receiverId, groupId);

    return await this.groupRepository.update(groupId, group);
  }

  async inviteViewer(senderId: string, groupId: string, receiverId: string) {
    const group = await this.groupRepository.findOne(groupId);
    this.groupValidator.validateGroupViewer(group, senderId);
    this.groupValidator.validateGroupInvite(group, receiverId);

    group.auth.viewers.push(receiverId);
    await this.userService.pushViewer(receiverId, groupId);

    return await this.groupRepository.update(groupId, group);
  }

  private async getAllMembers(memberIds: string[]) {
    const members = [];
    for (const memberId of memberIds) {
      members.push(await this.memberService.getOne(memberId));
    }
    return members;
  }

  private async getAllEvents(eventIds: string[]) {
    const events = [];
    for (const eventId of eventIds) {
      events.push(await this.eventService.getOne(eventId));
    }
    return events;
  }
}
