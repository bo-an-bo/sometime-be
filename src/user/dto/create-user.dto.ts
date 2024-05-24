import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 1234567890,
    description: '사용자의 카카오 ID',
  })
  readonly kakaoId: number;

  @ApiProperty({
    example: '박근형',
    description: '사용자의 이름',
  })
  readonly name: string;

  @ApiProperty({
    example: 'w8385@kakao.com',
    description: '사용자의 이메일',
  })
  readonly email: string;
}
