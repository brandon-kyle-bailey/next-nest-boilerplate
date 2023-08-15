import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.datasource';
import { AccountModule } from './modules/account/account.module';
import { UserModule } from './modules/user/user.module';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({ ...typeOrmConfig, autoLoadEntities: true }),
    AccountModule,
    UserModule,
    AuthenticationModule,
    RouterModule.register([
      {
        path: 'api/v1',
        module: AuthenticationModule,
      },
    ]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
