import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';

export class CreateMemberDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: '회원 이름',
    example: '박하은',
  })
  readonly name: string;

  @IsPhoneNumber('KR')
  @ApiProperty({
    description: '회원 연락처',
    example: '010-1234-5678',
  })
  readonly phoneNumber: string;
}
