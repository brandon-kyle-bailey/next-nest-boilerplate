import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
dotenv.config();

export const typeOrmConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: false,
  entities: [__dirname + '/../modules/**/repository/typeorm/model/*.model.ts'],
  migrations: [__dirname + '/../database/migration/*.js'],
};

export const dataSource = new DataSource({
  ...typeOrmConfig,
});
