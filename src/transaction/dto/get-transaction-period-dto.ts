import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty } from 'class-validator';

export class GetTransactionsPeriodDto {
  @IsNotEmpty()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  @ApiProperty({
    description: '조회 시작일자',
    example: '2023-06-25T15:09:34.778Z',
  })
  readonly startDate: Date;

  @IsNotEmpty()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  @ApiProperty({
    description: '조회 종료일자',
    example: '2023-08-25T15:09:34.778Z',
  })
  readonly endDate: Date;
}
