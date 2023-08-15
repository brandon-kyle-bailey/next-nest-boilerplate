import { AccountOrmModel } from '../../../../account/repo/typeorm/model/account.model';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user')
export class UserOrmModel {
  @PrimaryColumn('uuid')
  id!: string;

  @Column('uuid')
  accountId!: string;

  @Column('varchar')
  name!: string;

  @Column('varchar')
  email!: string;

  @Column('varchar', { nullable: true })
  image?: string;

  @Column('varchar', { nullable: true })
  refreshToken?: string;

  @Column('varchar')
  password!: string;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @ManyToOne(() => AccountOrmModel, (account) => account.id)
  account!: AccountOrmModel;
}
