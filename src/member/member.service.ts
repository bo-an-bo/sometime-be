import { Inject, Injectable } from '@nestjs/common';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { Model } from 'mongoose';
import { Member } from './interfaces/member.interface';

@Injectable()
export class MemberService {
  constructor(
    @Inject('MEMBER_MODEL')
    private readonly memberModel: Model<Member>,
  ) {}

  create(createMemberDto: CreateMemberDto) {
    return new this.memberModel(createMemberDto).save();
  }

  async findAll(): Promise<Member[]> {
    return this.memberModel.find().exec();
  }

  removeAll() {
    return this.memberModel.deleteMany({});
  }

  async findOne(id: string): Promise<Member> {
    return this.memberModel.findById(id).exec();
  }

  async update(id: string, updateMemberDto: UpdateMemberDto): Promise<Member> {
    try {
      const member = await this.memberModel.findById(id).exec();
      member.name = updateMemberDto.name;
      member.phoneNumber = updateMemberDto.phoneNumber;
      return member.save();
    } catch (e) {
      return null;
    }
  }

  async remove(id: string) {
    return this.memberModel.findByIdAndDelete(id);
  }
}
