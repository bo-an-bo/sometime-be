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
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { ApiBody, ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from '../http-exception.filter';
import { ApiFile } from '../api-file.decorator';

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
    summary: '그룹 회원 생성',
    description: '그룹의 회원들을 생성합니다.',
  })
  @ApiBody({ type: [CreateMemberDto] })
  create(
    @Param('groupId') groupId: string,
    @Body() createMemberDto: CreateMemberDto[],
  ) {
    return this.memberService.create(groupId, createMemberDto);
  }

  @Get()
  @ApiOperation({
    summary: '그룹의 모든 회원 조회',
    description: '그룹의 모든 회원을 조회합니다.',
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
    summary: '그룹 회원 모두 삭제',
    description: '그룹의 모든 회원을 삭제합니다.',
  })
  deleteAll(@Param('groupId') groupId: string) {
    return this.memberService.deleteAll(groupId);
  }

  @Delete(':memberId')
  @ApiOperation({
    summary: '그룹 회원 삭제',
    description: '그룹의 특정 회원들을 삭제합니다.',
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
  delete(@Param('groupId') groupId: string, @Body() members: string[]) {
    return this.memberService.delete(groupId, members);
  }

  @Post('/upload/excel')
  @ApiOperation({
    summary: '회원 명단 업로드',
    description: '회원 명단을 다시 업로드합니다.',
  })
  @ApiFile('excel')
  async uploadMemberFIle(
    @Param('groupId') groupId: string,
    @UploadedFile() excel: Express.Multer.File,
  ) {
    return await this.memberService.uploadMemberFile(groupId, excel);
  }
}
