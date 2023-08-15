import { v4 } from 'uuid';
import * as dotenv from 'dotenv';
dotenv.config();

export class AccountEntity {
  id: string;

  private constructor(id: string) {
    this.id = id;
  }

  public static create(_id?: string) {
    const id = _id || v4();
    return new AccountEntity(id);
  }
}
