import { Module } from '@nestjs/common';
import { AuthController } from './controller/auth.controller';
import { AccountModule } from '../account/account.module';
import { UserModule } from '../user/user.module';
import { ConfigService } from '@nestjs/config';
import { LoginUseCase } from './use-case/login/login.use-case';
import { RegisterUseCase } from './use-case/register/register.use-case';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
dotenv.config();

const repositories = [];
const mappers = [];
const useCases = [LoginUseCase, RegisterUseCase];
const controllers = [AuthController];

@Module({
  imports: [
    AccountModule,
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30m' },
    }),
  ],
  providers: [
    ...repositories,
    ...mappers,
    ...useCases,
    ...controllers,
    ConfigService,
  ],
  controllers,
  exports: [...repositories, ...mappers, ...useCases, ...controllers],
})
export class AuthenticationModule {}
