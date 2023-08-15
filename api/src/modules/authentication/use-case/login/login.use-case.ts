import {
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginUseCaseRequest } from './login.use-case.request';
import { LoginUseCaseResponse } from './login.use-case.response';
import { ConfigService } from '@nestjs/config';
import { UserRepository } from '../../../user/repo/typeorm/repository/user.repository';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from '../../../user/domain/entity/user.entity';
import { NIL } from 'uuid';

export interface ILoginUseCase {
  execute(input: any): Promise<any>;
}

@Injectable()
export class LoginUseCase implements ILoginUseCase {
  constructor(
    @Inject(UserRepository)
    protected readonly repository: UserRepository,
    @Inject(ConfigService)
    protected readonly configService: ConfigService,
    @Inject(JwtService)
    protected readonly jwtService: JwtService,
  ) {}
  async execute(request: LoginUseCaseRequest): Promise<LoginUseCaseResponse> {
    try {
      const secret = this.configService.get<string>('JWT_SECRET');
      const user = await this.repository.getByEmail(request.email);
      if (!user) {
        throw new UnauthorizedException();
      }
      if (!UserEntity.passwordIsCorrect(request.password, user.password)) {
        throw new UnauthorizedException();
      }
      const payload = { sub: user.id, username: user.email };
      const refreshToken = await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
        secret,
      });
      user.refreshToken = refreshToken;
      console.log(`refresh token`, refreshToken);
      console.log(
        `updated userOrmModel with new refresh token`,
        user.refreshToken,
      );
      await this.repository.update(user, NIL);
      return {
        access_token: await this.jwtService.signAsync(payload, {
          expiresIn: '30m',
          secret,
        }),
        refresh_token: refreshToken,
      };
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
