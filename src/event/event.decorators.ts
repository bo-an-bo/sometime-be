import { applyDecorators } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';

export function Event() {
  return applyDecorators(
    ApiTags('Event'),
    ApiParam({
      name: 'groupId',
      required: true,
      description: '모임 ID',
    }),
  );
}
