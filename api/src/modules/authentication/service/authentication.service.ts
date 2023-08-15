import {
  Inject,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { UserAccessDto } from '../dto/user.access.request.dto';
import { UserRegisterDto } from '../dto/user.register.request.dto';
import { UserRefreshDto } from '../dto/user.refresh.request.dto';
import { UserRevokeDto } from '../dto/user.revoke.request.dto';
import { UserTokenDto } from '../dto/user.token.dto';
import { TokenService } from './token.service';
import { UserRepository } from '../../user/repo/typeorm/repository/user.repository';
import { UserEntity } from '../../user/domain/entity/user.entity';
import { NIL } from 'uuid';
import { AccountRepository } from '../../account/repo/typeorm/repository/account.repository';
import { AccountEntity } from '../../account/domain/entity/account.entity';

export interface IAuthenticationService {
  register(input: UserRegisterDto): Promise<UserTokenDto>;
  access(input: UserAccessDto): Promise<UserTokenDto>;
  refresh(input: UserRefreshDto): Promise<UserTokenDto>;
  revoke(input: UserRevokeDto): Promise<string>;
}

@Injectable()
export class AuthenticationService implements IAuthenticationService {
  constructor(
    @Inject(UserRepository)
    protected readonly userRepository: UserRepository,
    @Inject(AccountRepository)
    protected readonly accountRepository: AccountRepository,
    @Inject(TokenService)
    protected readonly tokenService: TokenService,
  ) {}

  async register(input: UserRegisterDto): Promise<UserTokenDto> {
    try {
      const user = await this.userRepository.getByEmail(input.email);
      if (user) {
        throw new UnauthorizedException('User already exists');
      }
      const userProps = { ...input };
      if (!input.accountId) {
        const account = await this.accountRepository.create(
          AccountEntity.create(),
          NIL,
        );
        userProps.accountId = account.id;
      }
      const userEntity = await UserEntity.create({
        ...userProps,
        accountId: userProps.accountId,
      });
      const newUser = await this.userRepository.create(userEntity, NIL);
      const tokens = await this.tokenService.generateUserTokens({
        sub: newUser.id,
        username: newUser.email,
        account_id: newUser.accountId,
      });
      await this.userRepository.update(
        {
          ...newUser,
          refreshToken: tokens.refresh_token,
        },
        NIL,
      );
      console.log(tokens);
      return tokens;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async access(input: UserAccessDto): Promise<UserTokenDto> {
    try {
      const user = await this.userRepository.getByEmail(input.email);
      if (!user) {
        throw new UnauthorizedException('User does not exist');
      }
      if (!UserEntity.passwordIsCorrect(input.password, user.password)) {
        throw new UnauthorizedException('Invalid credentials');
      }
      const tokens = await this.tokenService.generateUserTokens({
        sub: user.id,
        username: user.email,
        account_id: user.accountId,
      });
      await this.userRepository.update(
        {
          ...user,
          refreshToken: tokens.refresh_token,
        },
        NIL,
      );
      return tokens;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async refresh(input: UserRefreshDto): Promise<UserTokenDto> {
    try {
      const { sub: userId } = await this.tokenService.verify(
        input.refresh_token,
      );
      const user = await this.userRepository.getById(userId);
      if (!user || !user.refreshToken) {
        throw new UnauthorizedException('User invalid');
      }
      if (input.refresh_token !== user.refreshToken) {
        throw new UnauthorizedException('Token invalid');
      }
      const tokens = await this.tokenService.generateUserTokens({
        sub: user.id,
        username: user.email,
        account_id: user.accountId,
      });
      await this.userRepository.update(
        {
          ...user,
          refreshToken: tokens.refresh_token,
        },
        NIL,
      );
      return tokens;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
  async revoke(input: UserRevokeDto): Promise<string> {
    try {
      const user = await this.userRepository.getById(input.id);
      if (!user) {
        throw new UnauthorizedException('User does not exist');
      }
      await this.userRepository.update({ ...user, refreshToken: null }, NIL);
      return user.id;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
