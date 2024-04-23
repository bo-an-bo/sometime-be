import { Body, Controller, Delete, Get, Post } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

import { DebugService } from './debug.service';

@ApiTags('Debug')
@Controller('debug')
export class DebugController {
  constructor(private readonly debugService: DebugService) {}

  @Post('parse')
  @ApiBody({ type: String })
  parse(@Body() body: any) {
    return this.debugService.parse(body);
  }

  @Get('all')
  findAll() {
    return this.debugService.findAll();
  }

  @Get('group')
  findAllGroups() {
    return this.debugService.findAllGroups();
  }

  @Get('member')
  findAllMembers() {
    return this.debugService.findAllMembers();
  }

  @Get('event')
  findAllEvents() {
    return this.debugService.findAllEvents();
  }

  @Delete('all')
  deleteAll() {
    return this.debugService.deleteAll();
  }

  @Delete('group')
  deleteGroups() {
    return this.debugService.deleteGroups();
  }

  @Delete('member')
  deleteMembers() {
    return this.debugService.deleteMembers();
  }

  @Delete('event')
  deleteEvents() {
    return this.debugService.deleteEvents();
  }
}
