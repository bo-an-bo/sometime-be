import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { firstValueFrom } from 'rxjs';

import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  kakaoCallback(
    code: string,
    // error: string,
    // error_description: string,
    // state: string,
  ) {
    return code;
  }

  async kakaoToken(code: string) {
    const { data } = await firstValueFrom(
      this.httpService.post(
        'https://kauth.kakao.com/oauth/token',
        {
          grant_type: 'authorization_code',
          client_id: this.configService.get<string>('KAKAO_REST_API_KEY'),
          redirect_uri: this.configService.get<string>('KAKAO_REDIRECT_URI'),
          code,
        },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
        },
      ),
    );

    return data['access_token'];
  }

  async kakaoTokenInfo(kakaoToken: string) {
    const { data } = await firstValueFrom(
      this.httpService.get('https://kapi.kakao.com/v1/user/access_token_info', {
        headers: {
          Authorization: `Bearer ${kakaoToken}`,
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      }),
    );

    return data;
  }

  async kakaoLogin(kakaoToken: string) {
    const { data } = await firstValueFrom(
      this.httpService.get('https://kapi.kakao.com/v2/user/me', {
        headers: {
          Authorization: `Bearer ${kakaoToken}`,
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
      }),
    );

    return data;
  }

  async kakaoLogout(kakaoToken: string) {
    const { data } = await firstValueFrom(
      this.httpService.post(
        'https://kapi.kakao.com/v1/user/logout',
        {},
        {
          headers: {
            Authorization: `Bearer ${kakaoToken}`,
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
        },
      ),
    );

    return data;
  }

  async kakaoUnlink(kakaoToken: string) {
    const { data } = await firstValueFrom(
      this.httpService.post(
        'https://kapi.kakao.com/v1/user/unlink',
        {},
        {
          headers: {
            Authorization: `Bearer ${kakaoToken}`,
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
          },
        },
      ),
    );

    return data;
  }

  async login(kakaoToken: string) {
    const kakaoInfo = await this.kakaoLogin(kakaoToken);

    const kakaoId = kakaoInfo.id;
    const name = kakaoInfo.kakao_account.profile.nickname;
    const email = kakaoInfo.kakao_account.email;

    let user = await this.userService.findOneByKakaoId(kakaoId);
    if (!user) {
      user = await this.userService.create({
        kakaoId,
        name,
        email,
      });
    }

    const payload = { sub: user.id, name: user.name, iat: Date.now() };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signout(kakaoToken: string) {
    const { id } = await this.kakaoTokenInfo(kakaoToken);

    this.userService.removeOneByKakaoId(id);
    await this.kakaoUnlink(kakaoToken);

    return { message: 'Successfully signed out' };
  }
}
