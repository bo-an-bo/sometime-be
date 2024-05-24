import { Body, Controller, Delete, Get, Param, Patch, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from '../auth/auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.getAll();
  }

  @UseGuards(AuthGuard)
  @ApiBearerAuth('Authorization')
  @Get('me')
  me(@Request() req: any) {
    return {
      user: req.user,
      userId: req.userId,
    };
  }

  @Get(':userId')
  findOne(@Param('userId') userId: string) {
    return this.userService.getOne(userId);
  }

  @Get('kakao/:kakaoId')
  findOneByKakaoId(@Param('kakaoId') kakaoId: string) {
    return this.userService.getOneByKakaoId(kakaoId);
  }

  @Patch(':userId')
  update(@Param('userId') userId: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(userId, updateUserDto);
  }

  @Delete()
  removeAll() {
    return this.userService.deleteAll();
  }

  @Delete(':userId')
  remove(@Param('userId') userId: string) {
    return this.userService.delete(userId);
  }
}
