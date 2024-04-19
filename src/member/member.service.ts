import { Injectable, NotFoundException } from '@nestjs/common';
import { MemberRepository } from './member.repository';
import { Member } from './entities/member.entity';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { GroupService } from '../group/group.service';
import mongoose from 'mongoose';

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
    const member = (await this.memberRepository.create(
      createMemberDto,
    )) as Member;
    await this.groupService.addMember(groupId, [member.id]);
    return member as Member;
  }

  async createGroupMembers(
    groupId: string,
    createMembersDto: CreateMemberDto[],
  ): Promise<Member[]> {
    const newMember: Member[] = [];
    for (const createMemberDto of createMembersDto) {
      const member = await this.memberRepository.create(createMemberDto);
      newMember.push(member as Member);
    }
    await this.groupService.addMember(
      groupId,
      newMember.map((member) => member.id),
    );

    return newMember;
  }

  async findAll(groupId: string): Promise<Member[]> {
    //lookup 써서 join하려고 했는데 model처리가 어려워서 임시로..디비 두번 접근
    const group = await this.groupService.findOne(groupId);
    return (await this.memberRepository.findAll(group.members)) as Member[];
  }

  async findOne(groupId: string, memberId: string): Promise<Member> {
    const group = await this.groupService.findOne(groupId);
    if (!group) return undefined;
    if (!group.members.includes(memberId)) return undefined;

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

  validateMemberIds(memberIds: string[]) {
    return memberIds.every(mongoose.Types.ObjectId.isValid);
  }

  async delete(groupId: string, memberId: string): Promise<void> {
    if (!this.validateMemberIds([memberId])) throw new NotFoundException();

    this.memberRepository.delete([memberId]);
    await this.groupService.deleteMembers(groupId, [memberId]);
  }

  async deleteGroupMembers(
    groupId: string,
    memberIds: string[],
  ): Promise<void> {
    if (!this.validateMemberIds(memberIds)) throw new NotFoundException();

    this.memberRepository.delete(memberIds);
    await this.groupService.deleteMembers(groupId, memberIds);
  }

  async deleteAllGroupMembers(groupId: string): Promise<void> {
    const group = await this.groupService.findOne(groupId);
    const memberIds = group.members;

    if (!this.validateMemberIds(memberIds)) throw new NotFoundException();

    this.memberRepository.delete(memberIds);
    await this.groupService.deleteMembers(groupId, memberIds);
  }

  async uploadMemberFile(
    groupId: string,
    excel: Express.Multer.File,
  ): Promise<Member[]> {
    const members: Member[] =
      await this.groupService.convertMemberExcelToJSON(excel);
    //멤버 삭제
    await this.deleteAllGroupMembers(groupId);
    //group에 멤버 추가
    return await this.createGroupMembers(groupId, members);
  }
}
