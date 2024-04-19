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
    createMembersDto: CreateMemberDto[],
  ): Promise<Member[]> {
    const newMember: Member[] = [];
    for (const createMemberDto of createMembersDto) {
      const member = await this.memberRepository.create(createMemberDto);
      await this.groupService.addMember(groupId, member.id);
      newMember.push(member as Member);
    }
    return newMember;
    // const member = await this.memberRepository.create(createMemberDto);
    // await this.groupService.addMember(groupId, member.id);
    // return member as Member;
  }

  async findAll(groupId: string): Promise<Member[]> {
    //lookup 써서 join하려고 했는데 model처리가 어려워서 임시로..디비 두번 접근
    const group = await this.groupService.findOne(groupId);
    console.log(group.members);
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

  async delete(groupId: string, memberIds: string[]): Promise<void> {
    for (const memberId of memberIds) {
      await this.groupService.deleteMember(groupId, memberId);
      this.memberRepository.delete(memberId);
    }
  }

  async deleteAll(groupId: string): Promise<void> {
    // group.members 초기화
    await this.groupService.deleteAllMember(groupId);
    const deleteMembers = await this.findAll(groupId);
    for (const member of deleteMembers) {
      this.memberRepository.delete(member.id);
    }
  }
}
