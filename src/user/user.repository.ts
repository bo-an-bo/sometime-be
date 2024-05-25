import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UserInterface } from './interfaces/user.interfaces';

@Injectable()
export class UserRepository {
  constructor(
    @Inject('USER_MODEL')
    private readonly userModel: Model<UserInterface>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userModel.create(createUserDto) as Promise<User>;
  }

  findAll() {
    return this.userModel.find().exec() as Promise<User[]>;
  }

  findOne(userId: string): Promise<User> {
    return this.userModel.findById(userId).exec() as Promise<User>;
  }

  findOneByKakaoId(kakaoId: string) {
    return this.userModel.findOne({ kakaoId }).exec() as Promise<User>;
  }

  update(userId: string, updateUserDto: CreateUserDto) {
    return this.userModel.findByIdAndUpdate(userId, updateUserDto, { new: true }).exec() as Promise<User>;
  }

  deleteAll() {
    this.userModel.deleteMany().exec().then();
  }

  delete(userId: string) {
    this.userModel.findByIdAndDelete(userId).exec().then();
  }

  deleteOneByKakaoId(kakaoId: string) {
    this.userModel.findOneAndDelete({ kakaoId }).exec().then();
  }
}
