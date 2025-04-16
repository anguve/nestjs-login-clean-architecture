import { Module } from '@nestjs/common';
import { RegisterUsersController } from '@user-registration/infrastructure/controllers/RegisterUsersController';

import { UserRegisterUseCase } from './application/use-cases/UserRegisterUseCase';
import { USER_REGISTER_PORT } from './application/ports/userRegisterPort';
import { I_USER_REGISTER_REPOSITORY } from './domain/repositories/IUserRepository';
import { UserRepositoryImpl } from './infrastructure/repositories/UserRepositoryImpl';
import { TypeOrmModule } from '@nestjs/typeorm';

import { I_PASSWORD_HASHER_PORT } from '@common/shared/domain/ports/IPasswordHasherPort';
import { BcryptPasswordHasherAdapter } from '@common/shared/infrastructure/adapters/security/BcryptPasswordHasherAdapter';
import { UserModel } from '@common/shared/infrastructure/database/models/UserModel';
import { USER_DELETE_PORT } from './application/ports/userDeletePort';
import { USER_GET_ALL_PORT } from './application/ports/userGetAllPort';
import { USER_GET_BY_ID_PORT } from './application/ports/userGetByIdPort';
import { USER_SEARCH_PORT } from './application/ports/userSearchPort';
import { USER_UPDATE_PORT } from './application/ports/userUpdatePort';
import { UserDeleteUseCase } from './application/use-cases/UserDeleteUseCase';
import { UserGetAllUseCase } from './application/use-cases/UserGetAllUseCase';
import { UserGetByIdUseCase } from './application/use-cases/UserGetByIdUseCase';
import { UserSearchUseCase } from './application/use-cases/UserSearchUseCase';
import { UserUpdateUseCase } from './application/use-cases/UserUpdateUseCase';

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
      useClass: BcryptPasswordHasherAdapter
    }
  ]
})
export class UserRegistrationModule {}
