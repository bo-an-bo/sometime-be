import { Injectable } from '@nestjs/common';

import { ExcelService } from '../excel/excel.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Member } from './entities/member.entity';
import { MemberRepository } from './member.repository';

@Injectable()
export class MemberService {
  constructor(
    private readonly memberRepository: MemberRepository,
    private readonly excelService: ExcelService,
  ) {}

  async create(createMemberDto: CreateMemberDto): Promise<string> {
    return (await this.memberRepository.create(createMemberDto)).id;
  }

  async uploadMemberFile(excel: Express.Multer.File): Promise<string[]> {
    const members: Member[] = await this.excelService.convertMemberExcelToMembers(excel);

    return await this.createGroupMembers(members);
  }

  async getOne(memberId: string) {
    return await this.memberRepository.findOne(memberId);
  }

  async update(memberId: string, updateMemberDto: UpdateMemberDto): Promise<Member> {
    return (await this.memberRepository.update(memberId, {
      name: updateMemberDto.name,
      memberInfo: updateMemberDto.memberInfo,
    } as UpdateMemberDto)) as Member;
  }

  deleteMany(memberIds: string[]) {
    return this.memberRepository.deleteMany(memberIds);
  }

  private async createGroupMembers(members: Member[]): Promise<string[]> {
    const memberIds: string[] = [];

    for (const member of members) {
      memberIds.push((await this.memberRepository.create(member)).id);
    }

    return memberIds;
  }
}
