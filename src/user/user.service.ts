import { Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.create(createUserDto);
  }

  async findAll() {
    return await this.userRepository.findAll();
  }

  async findOne(userId: string) {
    return await this.userRepository.findOne(userId);
  }

  async findOneByKakaoId(kakaoId: string) {
    return await this.userRepository.findOneByKakaoId(kakaoId);
  }

  async update(userId: string, updateUserDto: UpdateUserDto) {
    return { userId, updateUserDto };
  }

  remove(userId: string) {
    return this.userRepository.delete(userId);
  }
}
