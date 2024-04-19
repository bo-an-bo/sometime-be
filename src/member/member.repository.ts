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

  findAll(members: string[]): Promise<Member[]> {
    // // example로 사용한 값이 실제 id 형태(object)가 아니라 임시 처리
    // members.splice(members.indexOf('60f4b3b3b3b3b3b3b3b3b3'), 1);

    return this.memberModel.find({ _id: { $in: members } }).exec();
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
    console.log('delete', memberId);
    this.memberModel.findByIdAndDelete(memberId).exec();
  }

  deleteAll() {
    this.memberModel.deleteMany({}).exec();
  }
}
