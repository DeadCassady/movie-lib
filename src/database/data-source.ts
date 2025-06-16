import * as dotenv from 'dotenv'
dotenv.config()
import { DataSource } from "typeorm";

export default new DataSource({
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: +(process.env.DATABASE_PORT || 5432),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_DB,
  synchronize: false,
  dropSchema: false,
  logging: false,
  logger: 'file',
  seeds: ["src/database/seeding/**/*{.ts,.js}"],
  entities: ['./src/**/*.entity{.ts,.js}'],
  migrations: ['./src/database/migrations/*{.ts,.js}'],

})
