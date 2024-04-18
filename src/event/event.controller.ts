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
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventService.create(createEventDto);
  }

  @Get()
  findAll() {
    return this.eventService.findAll();
  }

  @Get(':eventId')
  @ApiParam({
    name: 'memberId',
    required: true,
    description: '모임 회원 ID',
  })
  findOne(
    @Param('groupId') groupId: string,
    @Param('eventId') eventId: string,
  ) {
    return this.eventService.findOne(groupId, eventId);
  }

  @Patch(':eventId')
  @ApiParam({
    name: 'memberId',
    required: true,
    description: '모임 회원 ID',
  })
  update(
    @Param('eventId') eventId: string,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    return this.eventService.update(+eventId, updateEventDto);
  }

  @Delete(':eventId')
  @ApiParam({
    name: 'memberId',
    required: true,
    description: '모임 회원 ID',
  })
  remove(@Param('eventId') eventId: string) {
    return this.eventService.remove(+eventId);
  }
}
