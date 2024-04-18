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
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from '../http-exception.filter';

@UseFilters(HttpExceptionFilter)
@ApiTags('Member')
@Controller('group/:groupId/member')
@ApiParam({
  name: 'groupId',
  required: true,
  description: '모임 ID',
})
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

  @Get(':memberId')
  @ApiOperation({
    summary: '회원 상세 조회',
    description: '특정 회원을 조회합니다.',
  })
  @ApiParam({
    name: 'memberId',
    required: true,
    description: '모임 회원 ID',
  })
  findOne(@Param('memberId') memberId: string) {
    return this.memberService.findOne(memberId);
  }

  @Patch(':memberId')
  @ApiOperation({
    summary: '회원 수정',
    description: '특정 회원을 수정합니다.',
  })
  @ApiParam({
    name: 'memberId',
    required: true,
    description: '모임 회원 ID',
  })
  update(
    @Param('memberId') memberId: string,
    @Body() updateMemberDto: UpdateMemberDto,
  ) {
    return this.memberService.update(memberId, updateMemberDto);
  }

  @Delete()
  @ApiOperation({
    summary: '모든 회원 삭제',
    description: '모든 회원을 삭제합니다.',
  })
  deleteAll() {
    return this.memberService.deleteAll();
  }

  @Delete(':memberId')
  @ApiOperation({
    summary: '회원 삭제',
    description: '특정 회원을 삭제합니다.',
  })
  @ApiParam({
    name: 'memberId',
    required: true,
    description: '모임 회원 ID',
  })
  delete(@Param('memberId') memberId: string) {
    return this.memberService.delete(memberId);
  }
}
