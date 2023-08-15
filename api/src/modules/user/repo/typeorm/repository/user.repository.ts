import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserOrmModel } from '../model/user.model';
import { UserEntity } from '../../../domain/entity/user.entity';

export interface IUserRepository {
  create(entity: UserEntity, createdBy: string): Promise<UserOrmModel>;
  getById(id: string): Promise<UserOrmModel>;
  getByEmail(email: string): Promise<UserOrmModel>;
  update(entity: UserOrmModel, updatedBy: string): Promise<UserOrmModel>;
  delete(
    id: string,
    accountId: string,
    deletedBy: string,
  ): Promise<UserOrmModel>;
  list(): Promise<UserOrmModel[]>;
  count(accountId: string, filter?: any): Promise<number>;
  cascadeDelete(model: any, deletedBy: string): Promise<UserOrmModel>;
  hardDelete(id: string): Promise<string>;
}

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserOrmModel)
    readonly repository: Repository<UserOrmModel>,
  ) {}
  async getByEmail(email: string): Promise<UserOrmModel> {
    try {
      return await this.repository.findOne({
        where: { email },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
  async create(entity: UserEntity, createdBy: string): Promise<UserOrmModel> {
    const model = { ...entity, createdBy, createdAt: new Date() };
    return await this.repository.save(model);
  }
  async getById(id: string): Promise<UserOrmModel> {
    try {
      return await this.repository.findOne({
        where: { id },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
  async update(entity: UserOrmModel, updatedBy: string): Promise<UserOrmModel> {
    try {
      return await this.repository.save({
        ...entity,
        updatedBy,
        updatedAt: new Date(),
      });
    } catch (error) {
      throw new Error(error);
    }
  }
  delete(id: string, deletedBy: string): Promise<UserOrmModel> {
    throw new Error('Method not implemented.');
  }
  list(): Promise<UserOrmModel[]> {
    throw new Error('Method not implemented.');
  }
  count(accountId: string, filter?: any): Promise<number> {
    throw new Error('Method not implemented.');
  }
  cascadeDelete(model: any, deletedBy: string): Promise<UserOrmModel> {
    throw new Error('Method not implemented.');
  }
  hardDelete(id: string): Promise<string> {
    throw new Error('Method not implemented.');
  }
}
