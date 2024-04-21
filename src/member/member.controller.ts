import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseFilters,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

import { ApiFile } from '../api-file.decorator';
import { HttpExceptionFilter } from '../http-exception.filter';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { MemberService } from './member.service';

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
    summary: '모임 회원 생성',
    description: '모임의 회원을 생성합니다.',
  })
  create(
    @Param('groupId') groupId: string,
    @Body() createMemberDto: CreateMemberDto,
  ) {
    return this.memberService.create(groupId, createMemberDto);
  }

  @Post('/list')
  @ApiOperation({
    summary: '모임 회원들 생성',
    description: '모임의 회원들을 생성합니다.',
  })
  @ApiBody({ type: [CreateMemberDto] })
  createGroupMembers(
    @Param('groupId') groupId: string,
    @Body() createMemberDto: CreateMemberDto[],
  ) {
    return this.memberService.createGroupMembers(groupId, createMemberDto);
  }

  @Get()
  @ApiOperation({
    summary: '모임 모든 회원 조회',
    description: '모임의 모든 회원을 조회합니다.',
  })
  findAll(@Param('groupId') groupId: string) {
    return this.memberService.findAll(groupId);
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
  findOne(
    @Param('groupId') groupId: string,
    @Param('memberId') memberId: string,
  ) {
    return this.memberService.findOne(groupId, memberId);
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

  @Delete(':memberId')
  @ApiOperation({
    summary: '모임 회원 삭제',
    description: '모임의 특정 회원을 삭제합니다.',
  })
  @ApiParam({
    name: 'memberId',
    required: true,
    description: '모임 회원 ID',
  })
  delete(
    @Param('groupId') groupId: string,
    @Param('memberId') memberId: string,
  ) {
    return this.memberService.delete(groupId, memberId);
  }

  @Delete('/list')
  @ApiOperation({
    summary: '모임 회원들 삭제',
    description: '모임의 특정 회원들을 삭제합니다.',
  })
  @ApiBody({
    schema: {
      type: 'array',
      items: {
        type: 'string',
        example: 'memberId',
      },
    },
  })
  deleteGroupMembers(
    @Param('groupId') groupId: string,
    @Body() memberIds: string[],
  ) {
    return this.memberService.deleteGroupMembers(groupId, memberIds);
  }

  @Delete()
  @ApiOperation({
    summary: '모임 모든 회원 삭제',
    description: '모임의 모든 회원을 삭제합니다.',
  })
  deleteAllGroupMembers(@Param('groupId') groupId: string) {
    return this.memberService.deleteAllGroupMembers(groupId);
  }

  @Post('/upload/excel')
  @ApiOperation({
    summary: '회원 명단 업로드',
    description: '회원 명단을 재구성합니다.',
  })
  @ApiFile('excel')
  async uploadMemberFIle(
    @Param('groupId') groupId: string,
    @UploadedFile() excel: Express.Multer.File,
  ) {
    return await this.memberService.uploadMemberFile(groupId, excel);
  }
}
