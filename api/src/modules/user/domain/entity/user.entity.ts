import { v4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
dotenv.config();

interface UserEntityProps {
  name: string;
  accountId: string;
  email: string;
  password: string;
  refreshToken?: string;
  image?: string;
}

export class UserEntity {
  id: string;
  accountId: string;
  name: string;
  email: string;
  password: string;
  refreshToken: string;
  image: string;

  private constructor(props: UserEntityProps, id: string) {
    this.id = id;
    this.accountId = props.accountId;
    this.name = props.name;
    this.email = props.email;
    this.password = props.password;
    this.refreshToken = props.refreshToken;
    this.image = props.image;
  }

  public static async create(props: UserEntityProps, _id?: string) {
    const id = _id || v4();
    const hashedPwd = await UserEntity.hash(props.password);
    return new UserEntity({ ...props, password: hashedPwd }, id);
  }

  public static async hash(input: string): Promise<string> {
    return await bcrypt.hash(input, process.env.ENCRYPTION_SALT);
  }

  public static async passwordIsCorrect(
    input: string,
    hash: string,
  ): Promise<boolean> {
    return await bcrypt.compare(input, hash);
  }
}
