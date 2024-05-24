import { Injectable } from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    return await this.userRepository.create(createUserDto);
  }

  async getAll() {
    return await this.userRepository.findAll();
  }

  async getOne(userId: string): Promise<User> {
    return await this.userRepository.findOne(userId);
  }

  async getOneByKakaoId(kakaoId: string) {
    return await this.userRepository.findOneByKakaoId(kakaoId);
  }

  async update(userId: string, updateUserDto: UpdateUserDto) {
    return { userId, updateUserDto };
  }

  async pushOwner(userId: string, groupId: string) {
    const user = await this.userRepository.findOne(userId);
    user.auth.owner.push(groupId);
    return this.userRepository.update(userId, user);
  }

  async pushEditor(userId: string, groupId: string) {
    const user = await this.userRepository.findOne(userId);
    user.auth.editor.push(groupId);
    return this.userRepository.update(userId, user);
  }

  async pushViewer(userId: string, groupId: string) {
    const user = await this.userRepository.findOne(userId);
    user.auth.viewer.push(groupId);
    return this.userRepository.update(userId, user);
  }

  async popOwner(userId: string, groupId: string) {
    const user = await this.userRepository.findOne(userId);
    user.auth.owner = user.auth.owner.filter((id) => id !== groupId);
    return this.userRepository.update(userId, user);
  }

  async popEditor(userId: string, groupId: string) {
    const user = await this.userRepository.findOne(userId);
    user.auth.editor = user.auth.editor.filter((id) => id !== groupId);
    return this.userRepository.update(userId, user);
  }

  async popViewer(userId: string, groupId: string) {
    const user = await this.userRepository.findOne(userId);
    user.auth.viewer = user.auth.viewer.filter((id) => id !== groupId);
    return this.userRepository.update(userId, user);
  }

  deleteAll() {
    return this.userRepository.deleteAll();
  }

  delete(userId: string) {
    return this.userRepository.delete(userId);
  }

  deleteOneByKakaoId(kakaoId: string) {
    return this.userRepository.deleteOneByKakaoId(kakaoId);
  }
}
