import { ApiProperty } from '@nestjs/swagger';

export class CreateMemberDto {
  @ApiProperty({
    description: '회원 이름',
    example: '박하은',
  })
  readonly name: string;

  @ApiProperty({
    description: '회원 연락처',
    example: '010-1234-5678',
  })
  readonly phoneNumber: string;
}
