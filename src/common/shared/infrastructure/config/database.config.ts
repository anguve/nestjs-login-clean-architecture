import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

import { validatedEnvVars } from '@common/shared/infrastructure/config/envs';

export default registerAs('database', () => ({
  type: 'postgres',
  host: validatedEnvVars.DB_HOST,
  port: validatedEnvVars.DB_PORT,
  username: validatedEnvVars.DB_USER,
  password: validatedEnvVars.DB_PASSWORD,
  database: validatedEnvVars.DB_NAME,
  entities: [],
  synchronize: false,
  logging: validatedEnvVars.NODE_ENV === 'development',
  migrations: [join(__dirname, '../database/migrations/*{.ts,.js}')],
  cli: {
    migrationsDir: 'src/migrations'
  },
  extra: {
    ssl:
      validatedEnvVars.NODE_ENV === 'production'
        ? { rejectUnauthorized: false }
        : false
  }
}));

export type DatabaseConfigType = TypeOrmModuleOptions;
