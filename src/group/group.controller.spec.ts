import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import * as process from 'process';

import { DatabaseModule } from '../database/database.module';
import { EventModule } from '../event/event.module';
import { MemberModule } from '../member/member.module';
import { Group } from './entities/group.entity';
import { GroupController } from './group.controller';
import { groupProviders } from './group.providers';
import { GroupRepository } from './group.repository';
import { GroupService } from './group.service';

describe('GroupController', () => {
  let groupController: GroupController;
  let groupService: GroupService;
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    process.env.MONGODB_URI = mongoServer.getUri();

    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, MemberModule, EventModule],
      controllers: [GroupController],
      providers: [GroupService, ...groupProviders, GroupRepository],
    }).compile();

    groupService = module.get<GroupService>(GroupService);
    groupController = module.get<GroupController>(GroupController);
  });

  describe('create', () => {
    it('should return a group', async () => {
      const group: Group = {
        id: '6626fa9e2b28caeae2d23f17',
        name: 'Group 1',
        manager: 'user1',
        description: 'Group 1 description',
        subManagers: null,
        members: ['user1', 'user2'],
        events: [],
      };

      const result: Group = await groupService.create(group, null);

      jest.spyOn(groupService, 'create').mockImplementation(async () => result);

      expect(await groupController.create(group, null)).toBe(result);
      expect(result).toHaveProperty('name', group.name);
      expect(result).toHaveProperty('description', group.description);
      expect(result).toHaveProperty('subManagers', group.subManagers);
      expect(result).toHaveProperty('members', group.members);
    });
  });

  // describe('addMember', () => {
  //   it('should return a group', async () => {
  //     const groupId = '6626fa9e2b28caeae2d23f17';
  //     const members: CreateMemberDto[] = [
  //       { name: 'user1', memberInfo: { email: 'user@1' } },
  //       { name: 'user2', memberInfo: { email: 'user@2' } },
  //     ];
  //
  //     const result: Group = await groupService.addMember(groupId, members);
  //
  //     jest
  //       .spyOn(groupService, 'addMember')
  //       .mockImplementation(async () => result);
  //
  //     expect(await groupController.addMember(groupId, members)).toBe(result);
  //     expect(result).toHaveProperty('members', ['user1', 'user2']);
  //
  //     expect(result.members[0]).toHaveProperty('name', members[0].name);
  //   });
  // });

  // describe('addEvent', () => {
  //   it('should return a group', async () => {
  //     const groupId = '6626fa9e2b28caeae2d23f17';
  //     const event: CreateEventDto = {
  //       name: 'Event 1',
  //       description: 'Event 1 description',
  //       startDate: new Date(),
  //       endDate: new Date(),
  //       fee: 10000,
  //     };
  //
  //     const result: Group = await groupService.addEvent(groupId, event);
  //
  //     jest
  //       .spyOn(groupService, 'addEvent')
  //       .mockImplementation(async () => result);
  //
  //     expect(await groupController.addEvent(groupId, event)).toBe(result);
  //     expect(result).toHaveProperty('events', [event]);
  //   });
  // });

  // describe('uploadMemberFile', () => {
  //   it('should return a group', async () => {
  //     const groupId = '6626fa9e2b28caeae2d23f17';
  //     const memberExcel: Express.Multer.File = {
  //       fieldname: 'file',
  //       originalname: 'members.xlsx',
  //       mimetype:
  //         'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  //       destination: './uploads',
  //       filename: 'members.xlsx',
  //       path: 'uploads/members.xlsx',
  //       size: 1000,
  //       buffer: Buffer.from(''),
  //       encoding: '7bit',
  //       stream: null,
  //     };
  //
  //     const result: Group = await groupService.uploadMemberFile(
  //       groupId,
  //       memberExcel,
  //     );
  //
  //     jest
  //       .spyOn(groupService, 'uploadMemberFile')
  //       .mockImplementation(async () => result);
  //
  //     expect(await groupController.uploadMemberFile(groupId, memberExcel)).toBe(
  //       result,
  //     );
  //   });
  // });

  describe('getAll', () => {
    it('should return an array of groups', async () => {
      const result: Group[] = await groupService.getAll();

      jest.spyOn(groupService, 'getAll').mockImplementation(async () => result);

      expect(await groupController.getAll()).toBe(result);
    });
  });

  // describe('getOne', () => {
  //   it('should return a group', async () => {
  //     const groupId = '6626fa9e2b28caeae2d23f17';
  //     const result: Group = await groupService.getOne(groupId);
  //
  //     jest.spyOn(groupService, 'getOne').mockImplementation(async () => result);
  //
  //     expect(await groupController.getOne(groupId)).toBe(result);
  //   });
  // });

  // describe('getMembers', () => {
  //   it('should return an array of members', async () => {
  //     const groupId = '6626fa9e2b28caeae2d23f17';
  //     const result: CreateMemberDto[] = await groupService.getMembers(groupId);
  //
  //     jest
  //       .spyOn(groupService, 'getMembers')
  //       .mockImplementation(async () => result);
  //
  //     expect(await groupController.getMembers(groupId)).toBe(result);
  //   });
  // });

  // describe('getEvents', () => {
  //   it('should return an array of events', async () => {
  //     const groupId = '6626fa9e2b28caeae2d23f17';
  //     const result: CreateEventDto[] = await groupService.getEvents(groupId);
  //
  //     jest
  //       .spyOn(groupService, 'getEvents')
  //       .mockImplementation(async () => result);
  //
  //     expect(await groupController.getEvents(groupId)).toBe(result);
  //   });
  // });

  // describe('update', () => {
  //   it('should return a group', async () => {
  //     const groupId = '6626fa9e2b28caeae2d23f17';
  //     const group: UpdateGroupDto = {
  //       name: 'Updated Group 1',
  //       description: 'Updated Group 1 description',
  //     };
  //
  //     const result: Group = await groupService.update(groupId, group);
  //
  //     jest.spyOn(groupService, 'update').mockImplementation(async () => result);
  //
  //     expect(await groupController.update(groupId, group)).toBe(result);
  //     expect(result).toHaveProperty('name', group.name);
  //     expect(result).toHaveProperty('description', group.description);
  //   });
  // });

  // describe('updateMember', () => {
  //   it('should return a group', async () => {
  //     const groupId = '6626fa9e2b28caeae2d23f17';
  //     const memberId = '6626fc126cbd16603120107a';
  //     const member: CreateMemberDto = {
  //       name: 'Updated User',
  //       memberInfo: { email: 'updated@user' },
  //     };
  //
  //     const result: Member = await groupService.updateMember(
  //       groupId,
  //       memberId,
  //       member,
  //     );
  //
  //     jest
  //       .spyOn(groupService, 'updateMember')
  //       .mockImplementation(async () => result);
  //
  //     expect(
  //       await groupController.updateMember(groupId, memberId, member),
  //     ).toBe(result);
  //   });
  // });

  // describe('updateEvent', () => {
  //   it('should return a group', async () => {
  //     const groupId = '6626fa9e2b28caeae2d23f17';
  //     const eventId = '6626fc126cbd16603120107a';
  //     const event: Event = {
  //       id: '6626fc126cbd16603120107a',
  //       name: 'Updated Event 1',
  //       description: 'Updated Event 1 description',
  //       startDate: new Date(),
  //       endDate: new Date(),
  //       fee: 20000,
  //       attendees: ['user1', 'user2'],
  //     };
  //
  //     const result: Event = await groupService.updateEvent(
  //       groupId,
  //       eventId,
  //       event,
  //     );
  //
  //     jest
  //       .spyOn(groupService, 'updateEvent')
  //       .mockImplementation(async () => result);
  //
  //     expect(await groupController.updateEvent(groupId, eventId, event)).toBe(
  //       result,
  //     );
  //   });
  // });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
  });
});
