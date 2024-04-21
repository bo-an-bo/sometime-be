import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('Event')
@Controller('group/:groupId/event')
@ApiParam({
  name: 'groupId',
  required: true,
  description: '모임 ID',
})
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  @ApiOperation({
    summary: '이벤트 생성',
    description: '모임의 이벤트를 생성합니다.',
  })
  create(
    @Param('groupId') groupId: string,
    @Body() createEventDto: CreateEventDto,
  ) {
    return this.eventService.create(groupId, createEventDto);
  }

  @Get()
  @ApiOperation({
    summary: '모임 모든 이벤트 조회',
    description: '모임의 모든 이벤트를 조회합니다.',
  })
  findAll(@Param('groupId') groupId: string) {
    return this.eventService.findAll(groupId);
  }

  @Get(':eventId')
  @ApiOperation({
    summary: '이벤트 상세 조회',
    description: '특정 이벤트를 조회합니다.',
  })
  @ApiParam({
    name: 'eventId',
    required: true,
    description: '이벤트 ID',
  })
  findOne(
    @Param('groupId') groupId: string,
    @Param('eventId') eventId: string,
  ) {
    return this.eventService.findOne(groupId, eventId);
  }

  @Patch(':eventId')
  @ApiOperation({
    summary: '이벤트 수정',
    description: '특정 이벤트를 수정합니다.',
  })
  @ApiParam({
    name: 'eventId',
    required: true,
    description: '이벤트 ID',
  })
  update(
    @Param('groupId') groupId: string,
    @Param('eventId') eventId: string,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    return this.eventService.update(groupId, eventId, updateEventDto);
  }

  @Delete(':eventId')
  @ApiOperation({
    summary: '이벤트 삭제',
    description: '특정 이벤트를 삭제합니다.',
  })
  @ApiParam({
    name: 'eventId',
    required: true,
    description: '이벤트 ID',
  })
  remove(@Param('groupId') groupId: string, @Param('eventId') eventId: string) {
    return this.eventService.remove(groupId, eventId);
  }
}
