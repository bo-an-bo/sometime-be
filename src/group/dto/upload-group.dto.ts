import { ApiProperty } from '@nestjs/swagger';

import { CreateGroupDto } from './create-group.dto';

export class UploadGroupDto extends CreateGroupDto {
  @ApiProperty({
    required: false,
    description: '모임 회원 명단 엑셀 파일',
    type: 'file',
    format: 'binary',
  })
  readonly memberExcel: Express.Multer.File | undefined;
}
