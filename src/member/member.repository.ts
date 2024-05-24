import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Member } from './entities/member.entity';
import { MemberInterface } from './interfaces/member.interface';

@Injectable()
export class MemberRepository {
  constructor(
    @Inject('MEMBER_MODEL')
    private readonly memberModel: Model<MemberInterface>,
  ) {}

  create(createMemberDto: CreateMemberDto): Promise<Member> {
    return this.memberModel.create(createMemberDto) as Promise<Member>;
  }

  findOne(memberId: string): Promise<Member> {
    return this.memberModel.findById(memberId).exec() as Promise<Member>;
  }

  update(memberId: string, updateMemberDto: UpdateMemberDto): Promise<Member> {
    return this.memberModel.findByIdAndUpdate(memberId, updateMemberDto, { new: true }).exec() as Promise<Member>;
  }

  deleteMany(memberIds: string[]) {
    this.memberModel
      .deleteMany({ _id: { $in: memberIds } })
      .exec()
      .then();
  }
}
