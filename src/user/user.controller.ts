import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AuthGuard } from '../auth/auth.guard';

@ApiTags('User')
@Controller('user')
export class UserController {
  @UseGuards(AuthGuard)
  @ApiBearerAuth('Authorization')
  @Get('me')
  me(@Request() req: any) {
    return req.user;
  }
}
