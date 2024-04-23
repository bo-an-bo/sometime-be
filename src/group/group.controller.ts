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
import { ApiBody, ApiOperation, ApiParam } from '@nestjs/swagger';

import { ApiFile } from '../common/decorators/api-file.decorator';
import { HttpExceptionFilter } from '../common/filters/http-exception.filter';
import { CreateEventDto } from '../event/dto/create-event.dto';
import { UpdateEventDto } from '../event/dto/update-event.dto';
import { Event } from '../event/event.decorators';
import { CreateMemberDto } from '../member/dto/create-member.dto';
import { UpdateMemberDto } from '../member/dto/update-member.dto';
import { Member } from '../member/member.decorators';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { UploadGroupDto } from './dto/upload-group.dto';
import { Group } from './group.decorators';
import { GroupService } from './group.service';

@Controller('group')
@UseFilters(HttpExceptionFilter)
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  @Group()
  @ApiOperation({
    summary: '모임 생성',
    description: '모임을 생성합니다.',
  })
  @ApiFile('memberExcel')
  @ApiBody({ type: UploadGroupDto })
  create(
    @Body() createGroupDto: CreateGroupDto,
    @UploadedFile() memberExcel: Express.Multer.File,
  ) {
    return this.groupService.create(createGroupDto, memberExcel);
  }

  @Post(':groupId/member')
  @Member()
  @ApiOperation({
    summary: '모임 멤버 추가',
    description: '특정 모임에 멤버를 추가합니다.',
  })
  @ApiBody({ type: [CreateMemberDto] })
  addMember(
    @Param('groupId') groupId: string,
    @Body() createMemberDto: CreateMemberDto[],
  ) {
    return this.groupService.addMember(groupId, createMemberDto);
  }

  @Post(':groupId/event')
  @Event()
  @ApiOperation({
    summary: '모임 이벤트 추가',
    description: '특정 모임에 이벤트를 추가합니다.',
  })
  addEvent(
    @Param('groupId') groupId: string,
    @Body() createEventDto: CreateEventDto,
  ) {
    return this.groupService.addEvent(groupId, createEventDto);
  }

  @Post(':groupId/member/excel')
  @Member()
  @ApiOperation({
    summary: '모임 회원 명단 엑셀 업로드',
    description: '모임 회원 명단 엑셀을 업로드하고, 회원을 재구성합니다.',
  })
  uploadMemberFile(
    @Param('groupId') groupId: string,
    @UploadedFile() memberExcel: Express.Multer.File,
  ) {
    return this.groupService.uploadMemberFile(groupId, memberExcel);
  }

  @Get()
  @Group()
  @ApiOperation({
    summary: '모든 모임 조회',
    description: '모든 모임을 조회합니다.',
  })
  getAll() {
    return this.groupService.getAll();
  }

  @Get(':groupId')
  @Group()
  @ApiParam({
    name: 'groupId',
    required: true,
    description: '모임 ID',
  })
  @ApiOperation({
    summary: '모임 상세 조회',
    description: '특정 모임을 조회합니다. (멤버, 이벤트 포함)',
  })
  getOne(@Param('groupId') groupId: string) {
    return this.groupService.getOne(groupId);
  }

  @Get(':groupId/member')
  @Member()
  @ApiOperation({
    summary: '모임 멤버 조회',
    description: '특정 모임의 멤버를 조회합니다.',
  })
  getMembers(@Param('groupId') groupId: string) {
    return this.groupService.getMembers(groupId);
  }

  @Get(':groupId/event')
  @Event()
  @ApiOperation({
    summary: '모임 이벤트 조회',
    description: '특정 모임의 이벤트를 조회합니다.',
  })
  getEvents(@Param('groupId') groupId: string) {
    return this.groupService.getEvents(groupId);
  }

  @Patch(':groupId')
  @Group()
  @ApiParam({
    name: 'groupId',
    required: true,
    description: '모임 ID',
  })
  @ApiOperation({
    summary: '모임 수정',
    description: '특정 모임을 수정합니다.',
  })
  update(
    @Param('groupId') groupId: string,
    @Body() updateGroupDto: UpdateGroupDto,
  ) {
    return this.groupService.update(groupId, updateGroupDto);
  }

  @Patch(':groupId/member/:memberId')
  @Member()
  @ApiOperation({
    summary: '모임 멤버 수정',
    description: '특정 모임의 멤버를 수정합니다.',
  })
  updateMember(
    @Param('groupId') groupId: string,
    @Param('memberId') memberId: string,
    @Body() updateMemberDto: UpdateMemberDto,
  ) {
    return this.groupService.updateMember(groupId, memberId, updateMemberDto);
  }

  @Patch(':groupId/event/:eventId')
  @Event()
  @ApiOperation({
    summary: '모임 이벤트 수정',
    description: '특정 모임의 이벤트를 수정합니다.',
  })
  updateEvent(
    @Param('groupId') groupId: string,
    @Param('eventId') eventId: string,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    return this.groupService.updateEvent(groupId, eventId, updateEventDto);
  }

  @Delete(':groupId')
  @Group()
  @ApiParam({
    name: 'groupId',
    required: true,
    description: '모임 ID',
  })
  @ApiOperation({
    summary: '모임 삭제',
    description: '특정 모임을 삭제합니다.',
  })
  delete(@Param('groupId') groupId: string) {
    return this.groupService.delete(groupId);
  }

  @Delete(':groupId/member')
  @Member()
  @ApiOperation({
    summary: '모임 멤버 삭제',
    description: '특정 모임의 멤버를 삭제합니다.',
  })
  deleteMembers(
    @Param('groupId') groupId: string,
    @Body() memberIds: string[],
  ) {
    return this.groupService.deleteMembers(groupId, memberIds);
  }

  @Delete(':groupId/event/:eventId')
  @Event()
  @ApiOperation({
    summary: '모임 이벤트 삭제',
    description: '특정 모임의 이벤트를 삭제합니다.',
  })
  deleteEvent(
    @Param('groupId') groupId: string,
    @Param('eventId') eventId: string,
  ) {
    return this.groupService.deleteEvent(groupId, eventId);
  }
}
