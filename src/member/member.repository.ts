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

  findOne(id: string): Promise<Member> {
    return this.memberModel.findById(id).exec();
  }

  update(id: string, updateMemberDto: UpdateMemberDto): Promise<Member> {
    return this.memberModel
      .findByIdAndUpdate(id, updateMemberDto, { new: true })
      .exec();
  }

  delete(id: string) {
    this.memberModel.findByIdAndDelete(id);
  }

  deleteAll() {
    this.memberModel.deleteMany({}).exec();
  }
}
