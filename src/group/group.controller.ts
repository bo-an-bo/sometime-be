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
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { HttpExceptionFilter } from '../http-exception.filter';
import { ApiFile } from '../api-file.decorator';

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

  @Get(':id')
  @ApiOperation({
    summary: '모임 상세 조회',
    description: '특정 모임을 조회합니다.',
  })
  findOne(@Param('id') id: string) {
    return this.groupService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: '모임 수정',
    description: '특정 모임을 수정합니다.',
  })
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupService.update(id, updateGroupDto);
  }

  @Delete()
  @ApiOperation({
    summary: '모든 모임 삭제',
    description: '모든 모임을 삭제합니다.',
  })
  deleteAll() {
    return this.groupService.deleteAll();
  }

  @Delete(':id')
  @ApiOperation({
    summary: '모임 삭제',
    description: '특정 모임을 삭제합니다.',
  })
  delete(@Param('id') id: string) {
    return this.groupService.delete(id);
  }

  @ApiOperation({
    summary: '모임 회원 엑셀 파일 업로드',
    description: '모임 회원 엑셀 파일을 업로드합니다.',
  })
  @Post(':id/member/excel')
  @ApiParam({
    name: 'id',
    required: true,
    description: '모임 ID',
  })
  @ApiFile('excel')
  async uploadMemberFile(
    @Param('id') id: string,
    @UploadedFile() excel: Express.Multer.File,
  ) {
    return await this.groupService.convertExcelToJSON(id, excel);
  }
}
