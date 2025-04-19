import { Module } from '@nestjs/common';
import { RegisterUsersController } from '@user-registration/infrastructure/controllers/register-users.controller';

import { UserRegisterUseCase } from './application/use-cases/user-register.use-case';
import { USER_REGISTER_PORT } from './application/ports/user-register.port';
import { I_USER_REGISTER_REPOSITORY } from './domain/repositories/user-repository.interface';
import { UserRepositoryImpl } from './infrastructure/repositories/user-repository.impl';
import { TypeOrmModule } from '@nestjs/typeorm';

import { I_PASSWORD_HASHER_PORT } from '@common/shared/domain/ports/password-hasher.port';
import { UserModel } from '@common/shared/infrastructure/database/models/user.model';
import { USER_DELETE_PORT } from './application/ports/user-delete.port';
import { USER_GET_ALL_PORT } from './application/ports/user-get-all.port';
import { USER_GET_BY_ID_PORT } from './application/ports/user-get-by-id.port';
import { USER_SEARCH_PORT } from './application/ports/user-search.port';
import { USER_UPDATE_PORT } from './application/ports/user-update.port';
import { UserDeleteUseCase } from './application/use-cases/user-delete.use-case';
import { UserGetAllUseCase } from './application/use-cases/user-get-all.use-case';
import { UserGetByIdUseCase } from './application/use-cases/user-get-by-id.use-case';
import { UserSearchUseCase } from './application/use-cases/user-search.use-case';
import { UserUpdateUseCase } from './application/use-cases/user-update.use-case';
import { DatabaseEncryptionTransformer } from '@common/shared/infrastructure/transformers/database-encryption.transformer';
import { validatedEnvVars } from '@common/shared/infrastructure/config/envs';

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
export class UserRegistrationModule {}
