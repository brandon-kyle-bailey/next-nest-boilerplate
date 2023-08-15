import { Inject, Injectable } from '@nestjs/common';
import { UserTokenPayloadDto } from '../dto/user.token.payload.dto';
import { UserTokenDto } from '../dto/user.token.dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

export interface ITokenService {
  generateUserTokens(input: UserTokenPayloadDto): Promise<UserTokenDto>;
  verify(input: string): Promise<UserTokenPayloadDto>;
}

@Injectable()
export class TokenService implements ITokenService {
  private _secret: string;
  constructor(
    @Inject(ConfigService)
    protected readonly configService: ConfigService,
    @Inject(JwtService)
    protected readonly jwtService: JwtService,
  ) {
    this._secret = this.configService.get<string>('JWT_SECRET');
  }
  async verify(input: string): Promise<UserTokenPayloadDto> {
    return await this.jwtService.verifyAsync(input, {
      secret: this._secret,
    });
  }
  async generateUserTokens(input: UserTokenPayloadDto): Promise<UserTokenDto> {
    return {
      refresh_token: await this.jwtService.signAsync(input, {
        expiresIn: '7d',
        secret: this._secret,
      }),
      access_token: await this.jwtService.signAsync(input, {
        expiresIn: '30m',
        secret: this._secret,
      }),
    };
  }
}
