import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseFilters,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from '../http-exception.filter';

@ApiTags('Member')
@Controller('member')
@UseFilters(HttpExceptionFilter)
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post()
  @ApiOperation({
    summary: '회원 생성',
    description: '회원을 생성합니다.',
  })
  create(@Body() createMemberDto: CreateMemberDto) {
    return this.memberService.create(createMemberDto);
  }

  @Get()
  @ApiOperation({
    summary: '모든 회원 조회',
    description: '모든 회원을 조회합니다.',
  })
  findAll() {
    return this.memberService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: '회원 상세 조회',
    description: '특정 회원을 조회합니다.',
  })
  findOne(@Param('id') id: string) {
    return this.memberService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: '회원 수정',
    description: '특정 회원을 수정합니다.',
  })
  update(@Param('id') id: string, @Body() updateMemberDto: UpdateMemberDto) {
    return this.memberService.update(id, updateMemberDto);
  }

  @Delete()
  @ApiOperation({
    summary: '모든 회원 삭제',
    description: '모든 회원을 삭제합니다.',
  })
  deleteAll() {
    return this.memberService.deleteAll();
  }

  @Delete(':id')
  @ApiOperation({
    summary: '회원 삭제',
    description: '특정 회원을 삭제합니다.',
  })
  delete(@Param('id') id: string) {
    return this.memberService.delete(id);
  }
}
