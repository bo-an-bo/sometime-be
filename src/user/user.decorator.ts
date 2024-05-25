import { applyDecorators } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export function User() {
  return applyDecorators(ApiTags('User'));
}
