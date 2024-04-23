import { applyDecorators } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export function Group() {
  return applyDecorators(ApiTags('Group'));
}
