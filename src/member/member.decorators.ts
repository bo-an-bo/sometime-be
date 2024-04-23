import { applyDecorators } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';

export function Member() {
  return applyDecorators(
    ApiTags('Member'),
    ApiParam({
      name: 'groupId',
      required: true,
      description: '모임 ID',
    }),
  );
}
