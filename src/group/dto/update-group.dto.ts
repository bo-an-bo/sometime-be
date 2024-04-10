import { ApiProperty } from '@nestjs/swagger';

export class UpdateGroupDto {
  @ApiProperty({
    description: '모임 이름',
    example: 'SSU',
  })
  readonly name: string;

  @ApiProperty({
    description: '모임 설명',
    example: '숭실대학교 학생들의 모임',
  })
  readonly description: string;
}
