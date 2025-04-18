import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { validatedEnvVars } from '@common/shared/infrastructure/config/envs';
import { GlobalExceptionFilter } from '@common/filters/GlobalExceptionFilter';
import { ValidationPipe } from '@nestjs/common';

const DEFAULT_SERVER_PORT = 3000;
const DEFAULT_SERVER_HOST = '0.0.0.0';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GlobalExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true, //TODO CAMBIAR A FALSE
      transform: true
    })
  );
  await app.listen(
    validatedEnvVars.SERVER_PORT ?? DEFAULT_SERVER_PORT,
    validatedEnvVars.SERVER_HOST ?? DEFAULT_SERVER_HOST
  );
}

bootstrap();
