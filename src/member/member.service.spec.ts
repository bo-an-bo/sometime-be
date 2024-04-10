import { MemberService } from './member.service';
import { Member } from './interfaces/member.interface';
import { HydratedDocument, Model } from 'mongoose';

describe('MemberService', () => {
  let memberService: MemberService;
  let memberModel: Model<Member>;

  beforeEach(async () => {
    memberService = new MemberService(memberModel);
  });

  describe('findAll', () => {
    it('should return an array of members', async () => {
      const result: HydratedDocument<any> = [
        { _id: 1, name: '테스트1' },
        { _id: 2, name: '테스트2' },
      ];
      jest.spyOn(memberService, 'findAll').mockImplementation(() => result);

      expect(await memberService.findAll()).toBe(result);
    });
  });
});
