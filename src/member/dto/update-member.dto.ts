import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateMemberDto } from './create-member.dto';

export class UpdateMemberDto extends PartialType(CreateMemberDto) {
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
