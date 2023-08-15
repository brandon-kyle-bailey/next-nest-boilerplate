import {
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserRepository } from '../../../user/repo/typeorm/repository/user.repository';
import { RegisterUseCaseRequest } from './register.use-case.request';
import { RegisterUseCaseResponse } from './register.use-case.response';
import { UserEntity } from '../../../user/domain/entity/user.entity';
import { NIL, v4 } from 'uuid';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AccountRepository } from '../../../account/repo/typeorm/repository/account.repository';
import { AccountEntity } from '../../../account/domain/entity/account.entity';

export interface IRegisterUseCase {
  execute(input: any): Promise<any>;
}

@Injectable()
export class RegisterUseCase implements IRegisterUseCase {
  constructor(
    @Inject(AccountRepository)
    protected readonly accountRepository: AccountRepository,
    @Inject(UserRepository)
    protected readonly userRepository: UserRepository,
    @Inject(ConfigService)
    protected readonly configService: ConfigService,
    @Inject(JwtService)
    protected readonly jwtService: JwtService,
  ) {}
  async execute(
    request: RegisterUseCaseRequest,
  ): Promise<RegisterUseCaseResponse> {
    try {
      const secret = this.configService.get<string>('JWT_SECRET');
      const user = await this.userRepository.getByEmail(request.email);
      if (user) {
        throw new UnauthorizedException();
      }
      const account = await this.accountRepository.create(
        AccountEntity.create(NIL),
        NIL,
      );
      const result = await this.userRepository.create(
        await UserEntity.create({ ...request, accountId: account.id }),
        NIL,
      );
      const payload = { sub: result.id, username: result.email };
      const refreshToken = await this.jwtService.signAsync(payload, {
        expiresIn: '7d',
        secret,
      });
      result.refreshToken = refreshToken;
      console.log(`refresh token`, refreshToken);
      console.log(
        `updated UserOrmModel with new refresh token`,
        result.refreshToken,
      );
      await this.userRepository.update(result, NIL);
      return {
        access_token: await this.jwtService.signAsync(payload, {
          expiresIn: '30m',
          secret,
        }),
        refresh_token: refreshToken,
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
