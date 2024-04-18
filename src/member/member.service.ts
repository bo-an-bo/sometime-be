import { Injectable } from '@nestjs/common';
import { MemberRepository } from './member.repository';
import { Member } from './entities/member.entity';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { GroupService } from '../group/group.service';

@Injectable()
export class MemberService {
  constructor(
    private readonly memberRepository: MemberRepository,
    private readonly groupService: GroupService,
  ) {}

  async create(
    groupId: string,
    createMemberDto: CreateMemberDto,
  ): Promise<Member> {
    // await this.groupService.addMember(groupId, member.id);
    return (await this.memberRepository.create(createMemberDto)) as Member;
  }

  async findAll(groupId: string): Promise<Member[]> {
    //lookup 써서 join하려고 했는데 model처리가 어려워서 임시로..디비 두번 접근
    const group = await this.groupService.findOne(groupId);
    return (await this.memberRepository.findAll(group.members)) as Member[];
  }

  async findOne(memberId: string): Promise<Member> {
    return (await this.memberRepository.findOne(memberId)) as Member;
  }

  async update(
    memberId: string,
    updateMemberDto: UpdateMemberDto,
  ): Promise<Member> {
    return (await this.memberRepository.update(memberId, {
      name: updateMemberDto.name,
      memberInfo: updateMemberDto.memberInfo,
    } as UpdateMemberDto)) as Member;
  }

  async delete(memberId: string): Promise<void> {
    return this.memberRepository.delete(memberId);
  }

  async deleteAll(): Promise<void> {
    return this.memberRepository.deleteAll();
  }
}
