import { Module } from '@nestjs/common';
import { RegisterUsersController } from '@user-registration/infrastructure/controllers/RegisterUsersController';
import { RegisterUsersDomainService } from '@user-registration/domain/services/RegisterUsersDomainService';
import { RegisterUserUseCase } from '@user-registration/application/use-cases/RegisterUserUseCase';

@Module({
  controllers: [RegisterUsersController],
  providers: [RegisterUsersDomainService, RegisterUserUseCase]
})
export class UserRegistrationModule {}
