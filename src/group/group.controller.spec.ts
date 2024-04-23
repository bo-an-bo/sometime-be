import { Test, TestingModule } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import * as process from 'process';

import { DatabaseModule } from '../database/database.module';
import { EventModule } from '../event/event.module';
import { MemberModule } from '../member/member.module';
import { CreateGroupDto } from './dto/create-group.dto';
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
      const group: CreateGroupDto = {
        name: 'Group 1',
        description: 'Group 1 description',
        subManagers: null,
        members: ['user1', 'user2'],
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

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
  });
});
