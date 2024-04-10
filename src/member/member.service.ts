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

  async findOne(id: string): Promise<Member> {
    return (await this.memberRepository.findOne(id)) as Member;
  }

  async update(id: string, updateMemberDto: UpdateMemberDto): Promise<Member> {
    return (await this.memberRepository.update(id, updateMemberDto)) as Member;
  }

  async delete(id: string): Promise<void> {
    return this.memberRepository.delete(id);
  }

  async deleteAll(): Promise<void> {
    return this.memberRepository.deleteAll();
  }
}
