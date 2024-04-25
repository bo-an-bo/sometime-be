import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsDate, IsNotEmpty } from 'class-validator';

export class GetTransactionPeriodDto {
  @IsNotEmpty()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  @ApiProperty({
    description: '2023-06-25T15:09:34.778Z',
    example: new Date(),
  })
  readonly startDate: Date;

  @IsNotEmpty()
  @IsDate()
  @Transform(({ value }) => new Date(value))
  @ApiProperty({
    description: '2023-08-25T15:09:34.778Z',
    example: new Date(),
  })
  readonly endDate: Date;
}
