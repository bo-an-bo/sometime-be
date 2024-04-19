// import { MemberController } from './member.controller';
// import { MemberService } from './member.service';
// import mongoose from 'mongoose';
// import { Test, TestingModule } from '@nestjs/testing';
// import { DatabaseModule } from '../database/database.module';
// import { MongoMemoryServer } from 'mongodb-memory-server';
// import * as process from 'process';
// import { memberProvider } from './member.provider';
// import { Member } from './entities/member.entity';
// import { MemberRepository } from './member.repository';
// import { GroupModule } from '../group/group.module';
// import { GroupService } from '../group/group.service';
// import { CreateGroupDto } from '../group/dto/create-group.dto';
// import { Group } from '../group/entities/group.entity';
//
// describe('MemberController', () => {
//   let memberController: MemberController;
//   let memberService: MemberService;
//   let groupService: GroupService;
//   let mongoServer: MongoMemoryServer;
//
//   beforeAll(async () => {
//     mongoServer = await MongoMemoryServer.create();
//     process.env.MONGODB_URI = mongoServer.getUri();
//
//     const module: TestingModule = await Test.createTestingModule({
//       imports: [DatabaseModule, GroupModule],
//       controllers: [MemberController],
//       providers: [MemberService, ...memberProvider, MemberRepository],
//     }).compile();
//
//     memberService = module.get<MemberService>(MemberService);
//     memberController = module.get<MemberController>(MemberController);
//   });
//
//   describe('create', () => {
//     it('should return a member[]', async () => {
//       const group: CreateGroupDto = {
//         name: 'Group 1',
//         description: 'Group 1 description',
//         subManagers: null,
//         members: ['user1', 'user2'],
//       };
//
//       const testGroup: Group = await groupService.create(group);
//       const groupId = testGroup.id;
//
//       const member = [
//         {
//           name: 'Member 1',
//           memberInfo: {
//             studentId: '20211806',
//             email: 'me@example.com',
//             phoneNumber: '010-1234-5678',
//           },
//         },
//       ];
//       const result: Member[] = await memberService.create(groupId, member);
//
//       jest
//         .spyOn(memberService, 'create')
//         .mockImplementation(async () => result);
//
//       expect(await memberController.create(groupId, member)).toBe(result);
//     });
//   });
//
//   describe('findAll', () => {
//     it('should return an array of members', async () => {
//       const testGroupId = '6616f02a10f10657a64d3283';
//       const testMembers = [
//         {
//           name: 'Member 1',
//           memberInfo: {
//             studentId: '20211806',
//             email: 'me@example.com',
//             phoneNumber: '010-1234-5678',
//           },
//         },
//         {
//           name: 'Member 2',
//           memberInfo: {
//             studentId: '20211806',
//             email: 'me@example.com',
//             phoneNumber: '010-1234-5678',
//           },
//         },
//       ];
//
//       const result: Member[] = await memberService.create(
//         testGroupId,
//         testMembers,
//       );
//
//       jest
//         .spyOn(memberService, 'findAll')
//         .mockImplementation(async () => result);
//
//       expect(await memberController.findAll(testGroupId)).toBe(result);
//     });
//   });
//
//   afterAll(async () => {
//     await mongoose.connection.dropDatabase();
//     await mongoose.connection.close();
//     await mongoServer.stop();
//   });
// });
