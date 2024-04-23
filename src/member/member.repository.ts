import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Member } from './interfaces/member.interface';

@Injectable()
export class MemberRepository {
  constructor(
    @Inject('MEMBER_MODEL')
    private readonly memberModel: Model<Member>,
  ) {}

  create(createMemberDto: CreateMemberDto): Promise<Member> {
    return this.memberModel.create(createMemberDto);
  }

  findOne(memberId: string): Promise<Member> {
    return this.memberModel.findById(memberId).exec();
  }

  update(memberId: string, updateMemberDto: UpdateMemberDto): Promise<Member> {
    return this.memberModel
      .findByIdAndUpdate(memberId, updateMemberDto, { new: true })
      .exec();
  }

  deleteMany(memberIds: string[]) {
    this.memberModel.deleteMany({ _id: { $in: memberIds } }).exec();
  }
}
