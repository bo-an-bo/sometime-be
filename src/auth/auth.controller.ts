import { Controller, Get, Post, Query } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

import { AuthService } from './auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('kakao/callback')
  async kakaoCallback(
    @Query('code') code: string,
    // @Query('error') error: string,
    // @Query('error_description') error_description: string,
    // @Query('state') state: string,
  ) {
    return this.authService.kakaoCallback(
      code,
      // error,
      // error_description,
      // state,
    );
  }

  @Post('kakao/token')
  @ApiQuery({ name: 'code', required: true })
  async kakaoToken(@Query('code') code: string) {
    return this.authService.kakaoToken(code);
  }

  @Post('kakao/login')
  @ApiQuery({ name: 'kakaoToken', required: true })
  async kakaoLogin(@Query('kakaoToken') kakaoToken: string) {
    return this.authService.kakaoLogin(kakaoToken);
  }

  @Post('kakao/logout')
  @ApiQuery({ name: 'kakaoToken', required: true })
  async kakaoLogout(@Query('kakaoToken') kakaoToken: string) {
    return this.authService.kakaoLogout(kakaoToken);
  }
}
