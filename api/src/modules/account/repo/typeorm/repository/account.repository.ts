import { Injectable } from '@nestjs/common';
import { AccountOrmModel } from '../model/account.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AccountEntity } from '../../../domain/entity/account.entity';

export interface IAccountRepository {
  create(entity: AccountEntity, createdBy: string): Promise<AccountOrmModel>;
  getById(id: string, accountId: string): Promise<AccountOrmModel>;
  update(entity: AccountOrmModel, updatedBy: string): Promise<AccountOrmModel>;
  delete(
    id: string,
    accountId: string,
    deletedBy: string,
  ): Promise<AccountOrmModel>;
  list(): Promise<AccountOrmModel[]>;
  count(accountId: string, filter?: any): Promise<number>;
  cascadeDelete(model: any, deletedBy: string): Promise<AccountOrmModel>;
  hardDelete(id: string): Promise<string>;
}

@Injectable()
export class AccountRepository implements IAccountRepository {
  constructor(
    @InjectRepository(AccountOrmModel)
    readonly repository: Repository<AccountOrmModel>,
  ) {}
  async create(
    entity: AccountEntity,
    createdBy: string,
  ): Promise<AccountOrmModel> {
    try {
      return await this.repository.save({
        ...entity,
        createdBy,
        createdAt: new Date(),
      });
    } catch (error) {
      throw new Error(error);
    }
  }
  getById(id: string, accountId: string): Promise<AccountOrmModel> {
    throw new Error('Method not implemented.');
  }
  update(entity: AccountOrmModel, updatedBy: string): Promise<AccountOrmModel> {
    throw new Error('Method not implemented.');
  }
  delete(
    id: string,
    accountId: string,
    deletedBy: string,
  ): Promise<AccountOrmModel> {
    throw new Error('Method not implemented.');
  }
  list(): Promise<AccountOrmModel[]> {
    throw new Error('Method not implemented.');
  }
  count(accountId: string, filter?: any): Promise<number> {
    throw new Error('Method not implemented.');
  }
  cascadeDelete(model: any, deletedBy: string): Promise<AccountOrmModel> {
    throw new Error('Method not implemented.');
  }
  hardDelete(id: string): Promise<string> {
    throw new Error('Method not implemented.');
  }
}
