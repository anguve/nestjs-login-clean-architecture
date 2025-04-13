import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { validatedEnvVars } from '@common/shared/infrastructure/config/envs';

const DEFAULT_SERVER_PORT = 3000;
const DEFAULT_SERVER_HOST = '0.0.0.0';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  await app.listen(
    validatedEnvVars.SERVER_PORT ?? DEFAULT_SERVER_PORT,
    validatedEnvVars.SERVER_HOST ?? DEFAULT_SERVER_HOST
  );
}

bootstrap();
