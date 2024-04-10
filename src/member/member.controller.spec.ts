import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { Member } from './interfaces/member.interface';
import { Model } from 'mongoose';

describe('MemberController', () => {
  let memberController: MemberController;
  let memberService: MemberService;
  let memberModel: Model<Member>;

  beforeEach(async () => {
    memberService = new MemberService(memberModel);
    memberController = new MemberController(memberService);
  });

  it('should be defined', () => {
    expect(memberController).toBeDefined();
  });
});
