import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { CreateUserDto } from './dto/create-user.dto';
import { UserInterface } from './interfaces/user.interfaces';

@Injectable()
export class UserRepository {
  constructor(
    @Inject('USER_MODEL')
    private readonly userModel: Model<UserInterface>,
  ) {}

  create(createUserDto: CreateUserDto) {
    return this.userModel.create(createUserDto);
  }

  findAll() {
    return this.userModel.find().exec();
  }

  findOne(userId: string) {
    return this.userModel.findById(userId).exec();
  }

  update(userId: string, updateUserDto: CreateUserDto) {
    return this.userModel
      .findByIdAndUpdate(userId, updateUserDto, { new: true })
      .exec();
  }

  delete(userId: string) {
    this.userModel.findByIdAndDelete(userId).exec().then();
  }
}
