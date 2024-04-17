import { Inject, Injectable } from '@nestjs/common';
import { Member } from './interfaces/member.interface';
import { Model } from 'mongoose';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';

@Injectable()
export class MemberRepository {
  constructor(
    @Inject('MEMBER_MODEL')
    private readonly memberModel: Model<Member>,
  ) {}

  create(createMemberDto: CreateMemberDto): Promise<Member> {
    return this.memberModel.create(createMemberDto);
  }

  findAll(): Promise<Member[]> {
    return this.memberModel.find().exec();
  }

  findOne(memberId: string): Promise<Member> {
    return this.memberModel.findById(memberId).exec();
  }

  update(memberId: string, updateMemberDto: UpdateMemberDto): Promise<Member> {
    return this.memberModel
      .findByIdAndUpdate(memberId, updateMemberDto, { new: true })
      .exec();
  }

  delete(memberId: string) {
    this.memberModel.findByIdAndDelete(memberId);
  }

  deleteAll() {
    this.memberModel.deleteMany({}).exec();
  }
}
