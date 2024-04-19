import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMemberDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: '회원 이름',
    example: '박하은',
  })
  readonly name: string;

  @ApiProperty({
    description: '회원 정보',
    example: {
      studentId: '20211806',
      email: 'me@example.com',
      phoneNumber: '010-1234-5678',
    },
  })
  readonly memberInfo: object;
}
