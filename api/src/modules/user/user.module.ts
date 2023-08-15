import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrmModel } from '../user/repo/typeorm/model/user.model';
import { AccountOrmModel } from '../account/repo/typeorm/model/account.model';
import { UserRepository } from './repo/typeorm/repository/user.repository';

const models = [AccountOrmModel, UserOrmModel];
const controllers = [];
const useCases = [];
const mappers = [];
const repositories = [UserRepository];

@Module({
  imports: [TypeOrmModule.forFeature(models)],
  controllers,
  providers: [...repositories, ...mappers, ...useCases, ...controllers],
  exports: [...repositories, ...mappers, ...useCases, ...controllers],
})
export class UserModule {}
