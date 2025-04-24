import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from '@common/shared/infrastructure/database/models/user.model';
import { I_PASSWORD_HASHER_PORT } from '@common/shared/domain/ports/password-hasher.port';
import { I_JWT_SERVICE_PORT } from '@common/shared/domain/ports/jwt-service.port';
import { JwtAdapter } from '@common/shared/infrastructure/adapters/security/jwt.adapter';
import { DatabaseEncryptionTransformer } from '@common/shared/infrastructure/transformers/database-encryption.transformer';
import { validatedEnvVars } from '@common/shared/infrastructure/config/envs';
import { I_TOKEN_GENERATOR_PORT } from '@common/shared/domain/ports/token-generator.port';
import { TokenService } from '@common/shared/application/service/token.service';
import { PasswordVerifierService } from '@auth/domain/services/password-verifier.service';
import { AuthController } from '@auth/infrastructure/controllers/auth.controller';
import { LoginUserUseCase } from '@auth/application/use-cases/login-user.use-case';
import { LOGIN_PORT } from '@auth/application/ports/login.port';
import { I_USER_REPOSITORY } from '@auth/domain/repositories/user-repository.interface';
import { UserRepositoryImpl } from '@auth/infrastructure/repositories/user-repository.impl';
import { I_PASSWORD_VERIFIER_PORT } from '@auth/domain/port/password-verifier.port';

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
      useFactory: () => {
        return new DatabaseEncryptionTransformer(
          validatedEnvVars.ENCRYPTION_KEY
        );
      }
    },
    {
      provide: I_JWT_SERVICE_PORT,
      useClass: JwtAdapter
    },
    {
      provide: I_TOKEN_GENERATOR_PORT,
      useClass: TokenService
    },
    {
      provide: I_PASSWORD_VERIFIER_PORT,
      useClass: PasswordVerifierService
    }
  ]
})
export class AuthModule {}
