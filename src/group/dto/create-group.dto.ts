import { ApiProperty } from '@nestjs/swagger';

export class CreateGroupDto {
  @ApiProperty({
    description: '모임 이름',
    example: 'SSU',
  })
  readonly name: string;
}
