import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import mongoose from 'mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from '../database/database.module';
import { MongoMemoryServer } from 'mongodb-memory-server';
import * as process from 'process';
import { memberProvider } from './member.provider';
import { Member } from './entities/member.entity';
import { MemberRepository } from './member.repository';

describe('MemberController', () => {
  let memberController: MemberController;
  let memberService: MemberService;
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    process.env.MONGODB_URI = mongoServer.getUri();

    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [MemberController],
      providers: [MemberService, ...memberProvider, MemberRepository],
    }).compile();

    memberService = module.get<MemberService>(MemberService);
    memberController = module.get<MemberController>(MemberController);
  });

  describe('create', () => {
    it('should return a member', async () => {
      const member = {
        name: 'Member 1',
        phoneNumber: '010-1234-5678',
      };

      const result: Member = await memberService.create(member);

      jest
        .spyOn(memberService, 'create')
        .mockImplementation(async () => result);

      expect(await memberController.create(member)).toBe(result);
    });
  });

  describe('findAll', () => {
    it('should return an array of members', async () => {
      const testMembers = [
        {
          name: 'Member 1',
          phoneNumber: '010-1234-5678',
        },
        {
          name: 'Member 2',
          phoneNumber: '010-2345-6789',
        },
      ];

      const result: Member[] = [];
      for (const member of testMembers) {
        result.push(await memberService.create(member));
      }

      jest
        .spyOn(memberService, 'findAll')
        .mockImplementation(async () => result);

      expect(await memberController.findAll()).toBe(result);
    });
  });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    await mongoServer.stop();
  });
});
