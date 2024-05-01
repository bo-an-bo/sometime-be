import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty({
    description: '이벤트 이름',
    example: '2024년 1학기 모임',
  })
  name: string;

  @ApiProperty({
    description: '이벤트 설명',
    example: '2024년 1학기 모임입니다.',
  })
  description: string;

  @ApiProperty({
    description: '이벤트 시작일',
    example: new Date().toISOString(),
  })
  startDate: Date;

  @ApiProperty({
    description: '이벤트 종료일',
    example: new Date(),
  })
  endDate: Date;

  @ApiProperty({
    description: '이벤트 입금 시작일',
    example: new Date().toISOString(),
  })
  transactionStartDate: Date;

  @ApiProperty({
    description: '이벤트 입금 마감일',
    example: new Date(),
  })
  transactionEndDate: Date;

  @ApiProperty({
    description: '이벤트 참가비',
    example: 10000,
  })
  fee: number;
}
