import { Module } from '@nestjs/common';
import { AuthController } from '@auth/infrastructure/controllers/AuthController';
import { LoginUserUseCase } from '@auth/application/use-cases/LoginUserUseCase';
import { LOGIN_PORT } from '@auth/application/ports/login.port';
import { I_USER_REPOSITORY } from '@auth/domain/repositories/IUserRepository';
import { UserRepositoryImpl } from '@auth/infrastructure/repositories/UserRepositoryImpl';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from './infrastructure/database/models/UserModel';

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
    }
  ]
})
export class AuthModule {}
