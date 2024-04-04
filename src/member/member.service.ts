import { Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

@Injectable()
export class MemberService {
  create(createMemberDto: CreateMemberDto) {
    return createMemberDto;
  }

  findAll() {
    return `This action returns all member`;
  }

  findOne(id: number) {
    return `This action returns a #${id} member`;
  }

  update(id: number, updateMemberDto: UpdateMemberDto) {
    return { id, updateMemberDto };
  }

  remove(id: number) {
    return `This action removes a #${id} member`;
  }
}