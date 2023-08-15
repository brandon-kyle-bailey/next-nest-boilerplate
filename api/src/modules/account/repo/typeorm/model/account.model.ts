import { UserOrmModel } from '../../../../user/repo/typeorm/model/user.model';
import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('account')
export class AccountOrmModel {
  @PrimaryColumn('uuid')
  id!: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @OneToMany(() => UserOrmModel, (user) => user.account)
  users!: UserOrmModel[];
}
