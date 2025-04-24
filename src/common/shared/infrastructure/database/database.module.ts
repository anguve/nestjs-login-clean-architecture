import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import databaseConfig from '@common/shared/infrastructure/config/database.config';

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
export class DatabaseModule {
  /**
   * AuthModule is currently empty by design.
   * This placeholder module is required by the framework and
   * will be extended with providers, controllers, and exports
   * in future implementations.
   */
}
