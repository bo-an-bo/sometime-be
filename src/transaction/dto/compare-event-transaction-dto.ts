import { ApiProperty } from '@nestjs/swagger';

export class CompareEventTransactionDTO {
  @ApiProperty({
    required: true,
    description: '회원 이름',
    example: '이소현',
  })
  name: string;

  @ApiProperty({
    required: true,
    description: '납부 여부',
    example: true,
  })
  isPaid: boolean;
}
