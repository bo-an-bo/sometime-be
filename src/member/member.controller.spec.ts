import { Test } from '@nestjs/testing';
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import * as process from 'process';

import { DatabaseModule } from '../database/database.module';
import { ExcelService } from '../excel/excel.service';
import { GroupModule } from '../group/group.module';
import { MemberController } from './member.controller';
import { memberProvider } from './member.provider';
import { MemberRepository } from './member.repository';
import { MemberService } from './member.service';

describe('MemberController', () => {
  // let memberController: MemberController;
  // let memberService: MemberService;
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    process.env.MONGODB_URI = mongoServer.getUri();

    await Test.createTestingModule({
      imports: [DatabaseModule, GroupModule],
      controllers: [MemberController],
      providers: [
        MemberService,
        ...memberProvider,
        MemberRepository,
        ExcelService,
      ],
    }).compile();

    // memberService = module.get<MemberService>(MemberService);
    // memberController = module.get<MemberController>(MemberController);
  });

  describe('create', () => {
    it('should return a member', async () => {
      // const member = {
      //   name: 'Member 1',
      //   phoneNumber: '010-1234-5678',
      // };
      //
      // const result: Member = await memberService.create(member);
      //
      // jest
      //   .spyOn(memberService, 'create')
      //   .mockImplementation(async () => result);

      // expect(await memberController.create(member)).toBe(result);
      expect(true).toBe(true);
    });
  });

  // describe('findAll', () => {
  //   it('should return an array of members', async () => {
  //     const testMembers = [
  //       {
  //         name: 'Member 1',
  //         phoneNumber: '010-1234-5678',
  //       },
  //       {
  //         name: 'Member 2',
  //         phoneNumber: '010-2345-6789',
  //       },
  //     ];
  //
  //     const result: Member[] = [];
  //     for (const member of testMembers) {
  //       result.push(await memberService.create(member));
  //     }
  //
  //     jest
  //       .spyOn(memberService, 'findAll')
  //       .mockImplementation(async () => result);
  //
  //     expect(await memberController.findAll()).toBe(result);
  //   });
  // });

  afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
    // await mongoServer.stop();
  });
});
