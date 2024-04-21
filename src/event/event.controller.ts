import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { ApiParam, ApiTags } from '@nestjs/swagger';

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
  create(
    @Param('groupId') groupId: string,
    @Body() createEventDto: CreateEventDto,
  ) {
    return this.eventService.create(groupId, createEventDto);
  }

  @Get()
  findAll(@Param('groupId') groupId: string) {
    return this.eventService.findAll(groupId);
  }

  @Get(':eventId')
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

  @Patch(':eventId')
  @ApiParam({
    name: 'eventId',
    required: true,
    description: '이벤트 ID',
  })
  remove(@Param('groupId') groupId: string, @Param('eventId') eventId: string) {
    return this.eventService.remove(groupId, eventId);
  }
}
