import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

class Metadata {
  @IsString()
  @ApiProperty({ description: '모임 ID', example: '64125455d454s' })
  groupId: string;

  @IsString()
  @ApiProperty({ description: '거래 유형', example: '입금' })
  transactionType: string;

  @IsNumber()
  @ApiProperty({ description: '거래 금액', example: 25000 })
  amount: number;

  @IsString()
  @ApiProperty({ description: '내용', example: '이소현' })
  name: string;
}

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: '거래 내역의 메타데이터',
    example: {
      groupId: '64125455d454s',
      transactionType: '입금',
      amount: 25000,
    },
  })
  readonly metadata: Metadata;

  @ApiProperty({
    description: '거래 일시',
    example: new Date(),
  })
  readonly timestamp: Date;
}
