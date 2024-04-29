import { ApiProperty } from '@nestjs/swagger';

export class UploadTransactionDto {
  @ApiProperty({
    required: false,
    description: '거래 내역 파일 비밀번호',
    example: '020928',
  })
  readonly password: string;

  @ApiProperty({
    required: true,
    description: '거래 내역 엑셀 파일',
    type: 'file',
    format: 'binary',
  })
  readonly transactionFile: Express.Multer.File | undefined;
}
