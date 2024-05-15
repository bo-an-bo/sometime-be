import { Injectable } from '@nestjs/common';

import { CreateEventDto } from '../event/dto/create-event.dto';
import { UpdateEventDto } from '../event/dto/update-event.dto';
import { Event } from '../event/entities/event.entity';
import { EventService } from '../event/event.service';
import { CreateMemberDto } from '../member/dto/create-member.dto';
import { UpdateMemberDto } from '../member/dto/update-member.dto';
import { MemberService } from '../member/member.service';
import { GetTransactionsPeriodDto } from '../transaction/dto/get-transaction-period-dto';
import { TransactionService } from '../transaction/transaction.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group } from './entities/group.entity';
import { GroupRepository } from './group.repository';

@Injectable()
export class GroupService {
  constructor(
    private readonly groupRepository: GroupRepository,
    private readonly memberService: MemberService,
    private readonly eventService: EventService,
    private readonly transactionService: TransactionService,
  ) {}

  async create(
    createGroupDto: CreateGroupDto,
    memberExcel: Express.Multer.File,
  ): Promise<Group> {
    const group: Group = createGroupDto as Group;

    if (memberExcel) {
      group.members = await this.memberService.uploadMemberFile(memberExcel);
    }

    return await this.groupRepository.create(group);
  }

  async addMember(
    groupId: string,
    createMemberDto: CreateMemberDto[],
  ): Promise<Group> {
    const group = await this.groupRepository.findOne(groupId);

    for (const member of createMemberDto) {
      group.members.push(await this.memberService.create(member));
    }

    await this.groupRepository.update(groupId, group);

    return group;
  }

  async addMemberToEvent(
    groupId: string,
    eventId: string,
    memberIds: string[],
  ) {
    const group = await this.groupRepository.findOne(groupId);
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

  async uploadMemberFile(
    groupId: string,
    memberExcel: Express.Multer.File,
  ): Promise<Group> {
    const group: Group = await this.groupRepository.findOne(groupId);

    group.members = await this.memberService.uploadMemberFile(memberExcel);

    return await this.groupRepository.update(groupId, group);
  }

  async uploadTransactionFile(
    groupId: string,
    transactionExcel: Express.Multer.File,
    password: string,
  ): Promise<void> {
    await this.transactionService.uploadTransactionFile(
      groupId,
      transactionExcel,
      password,
    );
  }

  async addEvent(
    groupId: string,
    createEventDto: CreateEventDto,
  ): Promise<object> {
    const group = await this.groupRepository.findOne(groupId);
    const eventId = await this.eventService.create(createEventDto);

    group.events.push(eventId);

    await this.groupRepository.update(groupId, group);
    return { eventId };
  }

  async getAll(): Promise<Group[]> {
    return await this.groupRepository.findAll();
  }

  async getOne(groupId: string): Promise<Group> {
    const group: Group = await this.groupRepository.findOne(groupId);

    const members = await this.getAllMembers(group.members);
    const events = await this.getAllEvents(group.events);

    group.members = members;
    group.events = events;

    return group;
  }

  async getMembers(groupId: string) {
    return this.groupRepository.findOne(groupId).then((group) => {
      return this.getAllMembers(group.members);
    });
  }

  async getEvents(groupId: string) {
    return this.groupRepository.findOne(groupId).then((group) => {
      return this.getAllEvents(group.events);
    });
  }

  async getTransactions(groupId: string) {
    return this.transactionService.getTransactions(groupId);
  }

  async getTransactionsByEvent(groupId: string, eventId: string) {
    return this.eventService.compareEventTransactions(groupId, eventId);
  }

  async getTransactionsByPeriod(
    groupId: string,
    periodDto: GetTransactionsPeriodDto,
  ) {
    return this.transactionService.getTransactionsByPeriod(
      groupId,
      periodDto.startDate,
      periodDto.endDate,
    );
  }

  async update(
    groupId: string,
    updateGroupDto: UpdateGroupDto,
  ): Promise<Group> {
    return await this.groupRepository.update(groupId, {
      name: updateGroupDto.name,
      description: updateGroupDto.description,
    } as UpdateGroupDto);
  }

  async updateMember(
    groupId: string,
    memberId: string,
    updateMemberDto: UpdateMemberDto,
  ) {
    const group = await this.groupRepository.findOne(groupId);
    const member = await this.memberService.update(memberId, updateMemberDto);

    group.members = group.members.map((m) => (m === memberId ? member.id : m));

    await this.groupRepository.update(groupId, group);

    return member;
  }

  async updateEvent(
    groupId: string,
    eventId: string,
    updateEventDto: UpdateEventDto,
  ) {
    const group: Group = await this.groupRepository.findOne(groupId);
    const event: Event = await this.eventService.update(
      eventId,
      updateEventDto,
    );

    group.events = group.events.map((e) => (e === eventId ? event.id : e));

    await this.groupRepository.update(groupId, group);

    return event;
  }

  async delete(groupId: string): Promise<void> {
    return this.groupRepository.delete(groupId);
  }

  async deleteMembers(groupId: string, memberIds: string[]): Promise<void> {
    const group = await this.groupRepository.findOne(groupId);
    const groupMembers = group.members;

    group.members = groupMembers.filter(
      (member) => !memberIds.includes(member),
    );
    this.memberService.deleteMany(memberIds);

    await this.groupRepository.update(groupId, group);
  }

  async deleteEvent(groupId: string, eventId: string): Promise<void> {
    const group = await this.groupRepository.findOne(groupId);
    const groupEvents = group.events;

    group.events = groupEvents.filter((event) => event !== eventId);
    this.eventService.delete(eventId);

    await this.groupRepository.update(groupId, group);
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
