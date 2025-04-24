import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { validatedEnvVars } from '@common/shared/infrastructure/config/envs';
import { I_PASSWORD_HASHER_PORT } from '@common/shared/domain/ports/password-hasher.port';
import { UserModel } from '@common/shared/infrastructure/database/models/user.model';
import { DatabaseEncryptionTransformer } from '@common/shared/infrastructure/transformers/database-encryption.transformer';
import { UserRegisterUseCase } from '@user-registration/application/use-cases/user-register.use-case';
import { USER_REGISTER_PORT } from '@user-registration/application/ports/user-register.port';
import { I_USER_REGISTER_REPOSITORY } from '@user-registration/domain/repositories/user-repository.interface';
import { UserRepositoryImpl } from '@user-registration/infrastructure/repositories/user-repository.impl';
import { USER_DELETE_PORT } from '@user-registration/application/ports/user-delete.port';
import { USER_GET_ALL_PORT } from '@user-registration/application/ports/user-get-all.port';
import { USER_GET_BY_ID_PORT } from '@user-registration/application/ports/user-get-by-id.port';
import { USER_SEARCH_PORT } from '@user-registration/application/ports/user-search.port';
import { USER_UPDATE_PORT } from '@user-registration/application/ports/user-update.port';
import { UserDeleteUseCase } from '@user-registration/application/use-cases/user-delete.use-case';
import { UserGetAllUseCase } from '@user-registration/application/use-cases/user-get-all.use-case';
import { UserGetByIdUseCase } from '@user-registration/application/use-cases/user-get-by-id.use-case';
import { UserSearchUseCase } from '@user-registration/application/use-cases/user-search.use-case';
import { UserUpdateUseCase } from '@user-registration/application/use-cases/user-update.use-case';
import { RegisterUsersController } from '@user-registration/infrastructure/controllers/register-users.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserModel])],
  controllers: [RegisterUsersController],
  providers: [
    {
      provide: USER_REGISTER_PORT,
      useClass: UserRegisterUseCase
    },
    {
      provide: USER_DELETE_PORT,
      useClass: UserDeleteUseCase
    },
    {
      provide: USER_GET_ALL_PORT,
      useClass: UserGetAllUseCase
    },
    {
      provide: USER_GET_BY_ID_PORT,
      useClass: UserGetByIdUseCase
    },
    {
      provide: USER_SEARCH_PORT,
      useClass: UserSearchUseCase
    },
    {
      provide: USER_UPDATE_PORT,
      useClass: UserUpdateUseCase
    },
    {
      provide: I_USER_REGISTER_REPOSITORY,
      useClass: UserRepositoryImpl
    },
    {
      provide: I_PASSWORD_HASHER_PORT,
      useFactory: () => {
        return new DatabaseEncryptionTransformer(
          validatedEnvVars.ENCRYPTION_KEY
        );
      }
    }
  ]
})
export class UserRegistrationModule {
  /**
   * AuthModule is currently empty by design.
   * This placeholder module is required by the framework and
   * will be extended with providers, controllers, and exports
   * in future implementations.
   */
}
