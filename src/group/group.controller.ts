import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseArrayPipe,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam } from '@nestjs/swagger';

import { AuthGuard } from '../auth/auth.guard';
import { ApiFile } from '../common/decorators/api-file.decorator';
import { ParseObjectIdPipe } from '../common/pipes/ParseObjectIdPipe';
import { CreateEventDto } from '../event/dto/create-event.dto';
import { UpdateEventDto } from '../event/dto/update-event.dto';
import { Event } from '../event/event.decorators';
import { CreateMemberDto } from '../member/dto/create-member.dto';
import { UpdateMemberDto } from '../member/dto/update-member.dto';
import { Member } from '../member/member.decorators';
import { GetTransactionsPeriodDto } from '../transaction/dto/get-transaction-period-dto';
import { UploadTransactionDto } from '../transaction/dto/upload-transaction-dto';
import { Transaction } from '../transaction/transaction.decorators';
import { User } from '../user/user.decorator';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { UploadGroupDto } from './dto/upload-group.dto';
import { Group } from './group.decorators';
import { GroupService } from './group.service';

@Controller('group')
@ApiBearerAuth('Authorization')
@UseGuards(AuthGuard)
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  @Group()
  @ApiOperation({
    summary: '모임 생성',
    description: '모임을 생성합니다.',
  })
  @ApiFile('memberFile')
  @ApiBody({ type: UploadGroupDto })
  create(@Req() req: any, @Body() createGroupDto: CreateGroupDto, @UploadedFile() memberExcel: Express.Multer.File) {
    return this.groupService.create(req.userId, createGroupDto, memberExcel);
  }

  @Post(':groupId/member')
  @Member()
  @ApiOperation({
    summary: '모임 멤버 추가',
    description: '특정 모임에 멤버를 추가합니다.',
  })
  @ApiBody({ type: [CreateMemberDto] })
  addMember(
    @Req() req: any,
    @Param('groupId', new ParseObjectIdPipe()) groupId: string,
    @Body() createMemberDto: CreateMemberDto[],
  ) {
    return this.groupService.addMember(req.userId, groupId, createMemberDto);
  }

  @Post(':groupId/event')
  @Event()
  @ApiOperation({
    summary: '모임 이벤트 추가',
    description: '특정 모임에 이벤트를 추가합니다.',
  })
  addEvent(
    @Req() req: any,
    @Param('groupId', new ParseObjectIdPipe()) groupId: string,
    @Body() createEventDto: CreateEventDto,
  ) {
    return this.groupService.addEvent(req.userId, groupId, createEventDto);
  }

  @Post(':groupId/event/:eventId/member')
  @Event()
  @ApiOperation({
    summary: '모임 이벤트에 참여 회원 추가',
    description: '특정 모임의 특정 이벤트에 참여하는 회원 목록을 추가합니다.',
  })
  @ApiBody({ type: [String] })
  addMemberToEvent(
    @Req() req: any,
    @Param('groupId', new ParseObjectIdPipe()) groupId: string,
    @Param('eventId', new ParseObjectIdPipe()) eventId: string,
    @Body() memberIds: string[],
  ) {
    return this.groupService.addMemberToEvent(req.userId, groupId, eventId, memberIds);
  }

  @Post(':groupId/member/excel')
  @Member()
  @ApiOperation({
    summary: '모임 회원 명단 엑셀 업로드',
    description: '모임 회원 명단 엑셀을 업로드하고, 회원을 재구성합니다.',
  })
  @ApiFile('memberFile')
  uploadMemberFile(
    @Req() req: any,
    @Param('groupId', new ParseObjectIdPipe()) groupId: string,
    @UploadedFile() memberExcel: Express.Multer.File,
  ) {
    return this.groupService.uploadMemberFile(req.userId, groupId, memberExcel);
  }

  @Post(':groupId/transaction/excel')
  @Transaction()
  @ApiOperation({
    summary: '모임 거래내역 업로드',
    description: '모임의 거래내역을 업로드합니다.',
  })
  @ApiFile('transactionFile')
  @ApiBody({ type: UploadTransactionDto })
  uploadTransactionFile(
    @Req() req: any,
    @Param('groupId', new ParseObjectIdPipe()) groupId: string,
    @Body() uploadTransactionDto: UploadTransactionDto,
    @UploadedFile() transactionExcel: Express.Multer.File,
  ) {
    return this.groupService.uploadTransactionFile(
      req.userId,
      groupId,
      transactionExcel,
      uploadTransactionDto.password,
    );
  }

  @Get()
  @Group()
  @ApiOperation({
    summary: '모든 모임 조회',
    description: '모든 모임을 조회합니다.',
  })
  getAll(@Req() req: any) {
    return this.groupService.getAll(req.userId);
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
  getOne(@Req() req: any, @Param('groupId', new ParseObjectIdPipe()) groupId: string) {
    return this.groupService.getOne(req.userId, groupId);
  }

  @Get(':groupId/member')
  @Member()
  @ApiOperation({
    summary: '모임 멤버 조회',
    description: '특정 모임의 멤버를 조회합니다.',
  })
  getMembers(@Req() req: any, @Param('groupId', new ParseObjectIdPipe()) groupId: string) {
    return this.groupService.getMembers(req.userId, groupId);
  }

  @Get(':groupId/event')
  @Event()
  @ApiOperation({
    summary: '모임 이벤트 조회',
    description: '특정 모임의 이벤트를 조회합니다.',
  })
  getEvents(@Req() req: any, @Param('groupId', new ParseObjectIdPipe()) groupId: string) {
    return this.groupService.getEvents(req.userId, groupId);
  }

  @Get(':groupId/event/:eventId')
  @Event()
  @ApiOperation({
    summary: '모임 이벤트 상세 조회',
    description: '특정 모임의 특정 이벤트를 조회합니다.',
  })
  getEvent(
    @Param('groupId') groupId: string,
    @Param('eventId') eventId: string,
  ) {
    return this.groupService.getEvent(groupId, eventId);
  }

  @Get(':groupId/transaction')
  @Transaction()
  @ApiOperation({
    summary: '모임 거래내역 조회',
    description: '특정 모임의 거래내역을 조회합니다.',
  })
  getTransactions(@Req() req: any, @Param('groupId', new ParseObjectIdPipe()) groupId: string) {
    return this.groupService.getTransactions(req.userId, groupId);
  }

  @Get(':groupId/transaction/period')
  @Transaction()
  @ApiOperation({
    summary: '모임 거래내역 조회',
    description: '특정 모임의 거래내역을 기간을 설정하여 조회합니다.',
  })
  getTransactionsByPeriod(
    @Req() req: any,
    @Param('groupId', new ParseObjectIdPipe()) groupId: string,
    @Query() getTransactionsPeriodDto: GetTransactionsPeriodDto,
  ) {
    return this.groupService.getTransactionsByPeriod(req.userId, groupId, getTransactionsPeriodDto);
  }

  @Get(':groupId/event/:eventId/transaction')
  @Event()
  @Transaction()
  @ApiOperation({
    summary: '모임 이벤트별 거래내역 조회',
    description: '모임의 특정 이벤트의 거래내역을 조회합니다.',
  })
  @ApiParam({
    name: 'groupId',
    required: true,
    description: '모임 ID',
  })
  @ApiParam({
    name: 'eventId',
    required: true,
    description: '이벤트 ID',
  })
  getTransactionsByEvent(
    @Req() req: any,
    @Param('groupId', new ParseObjectIdPipe()) groupId: string,
    @Param('eventId', new ParseObjectIdPipe()) eventId: string,
  ) {
    return this.groupService.getTransactionsByEvent(req.userId, groupId, eventId);
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
    @Req() req: any,
    @Param('groupId', new ParseObjectIdPipe()) groupId: string,
    @Body() updateGroupDto: UpdateGroupDto,
  ) {
    return this.groupService.update(req.userId, groupId, updateGroupDto);
  }

  @Patch(':groupId/member/:memberId')
  @Member()
  @ApiOperation({
    summary: '모임 멤버 수정',
    description: '특정 모임의 멤버를 수정합니다.',
  })
  updateMember(
    @Req() req: any,
    @Param('groupId', new ParseObjectIdPipe()) groupId: string,
    @Param('memberId', new ParseObjectIdPipe()) memberId: string,
    @Body() updateMemberDto: UpdateMemberDto,
  ) {
    return this.groupService.updateMember(req.userId, groupId, memberId, updateMemberDto);
  }

  @Patch(':groupId/event/:eventId')
  @Event()
  @ApiOperation({
    summary: '모임 이벤트 수정',
    description: '특정 모임의 이벤트를 수정합니다.',
  })
  updateEvent(
    @Req() req: any,
    @Param('groupId', new ParseObjectIdPipe()) groupId: string,
    @Param('eventId', new ParseObjectIdPipe()) eventId: string,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    return this.groupService.updateEvent(req.userId, groupId, eventId, updateEventDto);
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
  delete(@Req() req: any, @Param('groupId', new ParseObjectIdPipe()) groupId: string) {
    return this.groupService.delete(req.userId, groupId);
  }

  @Delete(':groupId/member')
  @Member()
  @ApiOperation({
    summary: '모임 멤버 삭제',
    description: '특정 모임의 멤버를 삭제합니다.',
  })
  deleteMembers(
    @Req() req: any,
    @Param('groupId', new ParseObjectIdPipe()) groupId: string,
    @Body(new ParseArrayPipe({ items: String, separator: ',' })) memberIds: string[],
  ) {
    return this.groupService.deleteMembers(req.userId, groupId, memberIds);
  }

  @Delete(':groupId/event/:eventId')
  @Event()
  @ApiOperation({
    summary: '모임 이벤트 삭제',
    description: '특정 모임의 이벤트를 삭제합니다.',
  })
  deleteEvent(
    @Req() req: any,
    @Param('groupId', new ParseObjectIdPipe()) groupId: string,
    @Param('eventId', new ParseObjectIdPipe()) eventId: string,
  ) {
    return this.groupService.deleteEvent(req.userId, groupId, eventId);
  }

  @Post(':groupId/invite/editor')
  @User()
  @ApiOperation({
    summary: '모임 편집자 초대',
    description: '특정 모임에 편집자를 초대합니다.',
  })
  inviteEditor(
    @Req() req: any,
    @Param('groupId', new ParseObjectIdPipe()) groupId: string,
    @Query('userId', new ParseObjectIdPipe()) userId: string,
  ) {
    return this.groupService.inviteEditor(req.userId, groupId, userId);
  }

  @Post(':groupId/invite/viewer')
  @User()
  @ApiOperation({
    summary: '모임 조회자 초대',
    description: '특정 모임에 조회자를 초대합니다.',
  })
  inviteViewer(
    @Req() req: any,
    @Param('groupId', new ParseObjectIdPipe()) groupId: string,
    @Query('userId', new ParseObjectIdPipe()) userId: string,
  ) {
    return this.groupService.inviteViewer(req.userId, groupId, userId);
  }
}
