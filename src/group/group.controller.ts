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
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

import { HttpExceptionFilter } from '../common/filters/http-exception.filter';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { GroupService } from './group.service';

@ApiTags('Group')
@Controller('group')
@UseFilters(HttpExceptionFilter)
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  @ApiOperation({
    summary: '모임 생성',
    description: '모임을 생성합니다.',
  })
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupService.create(createGroupDto);
  }

  @Get()
  @ApiOperation({
    summary: '모든 모임 조회',
    description: '모든 모임을 조회합니다.',
  })
  findAll() {
    return this.groupService.findAll();
  }

  @Get(':groupId')
  @ApiParam({
    name: 'groupId',
    required: true,
    description: '모임 ID',
  })
  @ApiOperation({
    summary: '모임 상세 조회',
    description: '특정 모임을 조회합니다.',
  })
  findOne(@Param('groupId') groupId: string) {
    return this.groupService.findOne(groupId);
  }

  @Patch(':groupId')
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

  @Delete()
  @ApiOperation({
    summary: '모든 모임 삭제',
    description: '모든 모임을 삭제합니다.',
  })
  deleteAll() {
    return this.groupService.deleteAll();
  }

  @Delete(':groupId')
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
}
