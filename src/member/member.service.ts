import { Injectable } from '@nestjs/common';
import { MemberRepository } from './member.repository';
import { Member } from './entities/member.entity';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

@Injectable()
export class MemberService {
  constructor(private readonly memberRepository: MemberRepository) {}

  async create(createMemberDto: CreateMemberDto): Promise<Member> {
    return (await this.memberRepository.create(createMemberDto)) as Member;
  }

  async findAll(): Promise<Member[]> {
    return (await this.memberRepository.findAll()) as Member[];
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
      phoneNumber: updateMemberDto.phoneNumber,
    } as UpdateMemberDto)) as Member;
  }

  async delete(memberId: string): Promise<void> {
    return this.memberRepository.delete(memberId);
  }

  async deleteAll(): Promise<void> {
    return this.memberRepository.deleteAll();
  }
}
