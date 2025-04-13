import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import databaseConfig from '../config/database.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(databaseConfig)],
      useFactory: async (
        config: ConfigService
      ): Promise<TypeOrmModuleOptions> =>
        config.get<TypeOrmModuleOptions>('database') ?? {},
      inject: [ConfigService]
    })
  ],
  exports: [TypeOrmModule]
})
export class DatabaseModule {}
