import { Module } from '@nestjs/common';
import { AuthController } from '@auth/infrastructure/controllers/auth.controller';
import { LoginUserUseCase } from '@auth/application/use-cases/login-user.use-case';
import { LOGIN_PORT } from '@auth/application/ports/login.port';
import { I_USER_REPOSITORY } from '@auth/domain/repositories/user-repository.interface';
import { UserRepositoryImpl } from '@auth/infrastructure/repositories/user-repository.impl';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from '@common/shared/infrastructure/database/models/user.model';
import { I_PASSWORD_HASHER_PORT } from '@common/shared/domain/ports/password-hasher.port';
import { BcryptPasswordHasherAdapter } from '@common/shared/infrastructure/adapters/security/bcrypt-password-hasher.adapter';
import { I_JWT_SERVICE_PORT } from '@common/shared/domain/ports/jwt-service.port';
import { JwtAdapter } from '@common/shared/infrastructure/adapters/security/jwt.adapter';

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
