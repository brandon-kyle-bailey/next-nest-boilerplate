import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AccountModule } from '../account/account.module';
import { UserModule } from '../user/user.module';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TokenService } from './service/token.service';
import { AuthenticationService } from './service/authentication.service';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from '../common/strategy/jwt.strategy';
import { JwtRefreshStrategy } from '../common/strategy/jwt-refresh.strategy';

const repositories = [];
const mappers = [];
const useCases = [];
const strategies = [JwtStrategy, JwtRefreshStrategy];
const services = [TokenService, AuthenticationService];
const controllers = [AuthController];

@Module({
  imports: [
    AccountModule,
    UserModule,
    PassportModule,
    JwtModule.register({
      global: true,
    }),
  ],
  providers: [
    ...repositories,
    ...mappers,
    ...useCases,
    ...strategies,
    ...services,
    ...controllers,
    ConfigService,
  ],
  controllers,
  exports: [
    ...repositories,
    ...mappers,
    ...services,
    ...useCases,
    ...controllers,
  ],
})
export class AuthenticationModule {}
