import 'dotenv/config';
import { object, number, string } from 'yup';

const DEFAULT_SERVER_PORT = 3000;

const environmentVariablesSchema = object({
  NODE_ENV: string().required(),

  SERVER_HOST: string().required().default('0.0.0.0'),
  SERVER_PORT: number().required().default(DEFAULT_SERVER_PORT),

  DB_HOST: string().required(),
  DB_PORT: number().required(),
  DB_USER: string().required(),
  DB_PASSWORD: string().required(),
  DB_NAME: string().required(),
  DB_SCHEMA: string().default('public'),

  JWT_SECRET: string().required().default('default'),
  JWT_EXPIRES_IN: string().required().default('1h'),

  ENCRYPTION_KEY: string().required().default('default')
}).noUnknown();

export const validatedEnvVars = environmentVariablesSchema.validateSync(
  process.env
);
