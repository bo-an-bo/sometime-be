import { ApiProperty } from '@nestjs/swagger';

export class CreateGroupDto {
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

  @ApiProperty({
    description: '모임장 사용자의 ObjectId',
    example: '60f4b3b3b3b3b3b3b3b3b3b3',
  })
  readonly manager: string;

  @ApiProperty({
    description: '부모임장 사용자의 ObjectId와 권한',
    example: [
      {
        user: '60f4b3b3b3b3b3b3b3b3b3',
        authorities: ['subManager'],
      },
    ],
  })
  readonly subManagers: [
    {
      user: string;
      authorities: string[];
    },
  ];

  @ApiProperty({
    description: '모임원 사용자의 ObjectId',
    example: ['60f4b3b3b3b3b3b3b3b3b3'],
  })
  readonly members: string[];
}
