import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountOrmModel } from './repo/typeorm/model/account.model';
import { AccountRepository } from './repo/typeorm/repository/account.repository';
import { UserOrmModel } from '../user/repo/typeorm/model/user.model';

const models = [AccountOrmModel, UserOrmModel];
const controllers = [];
const useCases = [];
const mappers = [];
const repositories = [AccountRepository];

@Module({
  imports: [TypeOrmModule.forFeature(models)],
  controllers,
  providers: [...controllers, ...useCases, ...mappers, ...repositories],
  exports: [...controllers, ...useCases, ...mappers, ...repositories],
})
export class AccountModule {}
