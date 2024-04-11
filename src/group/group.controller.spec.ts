import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from '../database/database.module';
import { groupProvider } from './group.provider';
import { MongoMemoryServer } from 'mongodb-memory-server';
import * as process from 'process';
import { Group } from './entities/group.entity';
import mongoose from 'mongoose';
import { CreateGroupDto } from './dto/create-group.dto';
import { GroupRepository } from './group.repository';

describe('GroupController', () => {
  let groupController: GroupController;
  let groupService: GroupService;
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    process.env.MONGODB_URI = mongoServer.getUri();

    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [GroupController],
      providers: [GroupService, ...groupProvider, GroupRepository],
    }).compile();

    groupService = module.get<GroupService>(GroupService);
    groupController = module.get<GroupController>(GroupController);
  });

  describe('create', () => {
    it('should return a group', async () => {
      const group: CreateGroupDto = {
        name: 'Group 1',
        description: 'Group 1 description',
        manager: 'user1',
        subManagers: null,
        members: ['user1', 'user2'],
      };

      const result: Group = await groupService.create(group);

      jest.spyOn(groupService, 'create').mockImplementation(async () => result);

      expect(await groupController.create(group)).toBe(result);
      expect(result).toHaveProperty('name', group.name);
      expect(result).toHaveProperty('description', group.description);
      expect(result).toHaveProperty('manager', group.manager);
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
