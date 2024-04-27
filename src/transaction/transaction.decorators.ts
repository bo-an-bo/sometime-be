import { applyDecorators } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

export function Transaction() {
  return applyDecorators(ApiTags('Transaction'));
}
