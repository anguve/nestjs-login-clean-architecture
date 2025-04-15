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

@Module({
  imports: [TypeOrmModule.forFeature([UserModel])],
  controllers: [RegisterUsersController],
  providers: [
    {
      provide: USER_REGISTER_PORT,
      useClass: UserRegisterUseCase
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
