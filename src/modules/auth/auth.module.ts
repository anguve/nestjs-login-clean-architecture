import { Module } from '@nestjs/common';
import { AuthController } from '@auth/infrastructure/controllers/AuthController';
import { LoginUserUseCase } from '@auth/application/use-cases/LoginUserUseCase';
import { LOGIN_PORT } from '@auth/application/ports/login.port';
import { I_USER_REPOSITORY } from '@auth/domain/repositories/IUserRepository';
import { UserRepositoryImpl } from '@auth/infrastructure/repositories/UserRepositoryImpl';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from '@auth/infrastructure/database/models/UserModel';
import { I_PASSWORD_HASHER_PORT } from '@common/shared/domain/ports/IPasswordHasherPort';
import { BcryptPasswordHasherAdapter } from '@common/shared/infrastructure/adapters/security/BcryptPasswordHasherAdapter';
import { I_JWT_SERVICE_PORT } from '@common/shared/domain/ports/IJwtServicePort';
import { JwtAdapter } from '@common/shared/infrastructure/adapters/security/JwtAdapter';

@Module({
  imports: [TypeOrmModule.forFeature([UserModel])],
  controllers: [AuthController],
  providers: [
    {
      provide: LOGIN_PORT,
      useClass: LoginUserUseCase
    },
    {
      provide: I_USER_REPOSITORY,
      useClass: UserRepositoryImpl
    },
    {
      provide: I_PASSWORD_HASHER_PORT,
      useClass: BcryptPasswordHasherAdapter
    },
    {
      provide: I_JWT_SERVICE_PORT,
      useClass: JwtAdapter
    }
  ]
})
export class AuthModule {}
