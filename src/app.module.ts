import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserRegistrationModule } from './modules/user-registration/register-users.module';
import { DatabaseModule } from './common/shared/infrastructure/database/database.module';

@Module({
  imports: [AuthModule, UserRegistrationModule, DatabaseModule],
  controllers: [],
  providers: []
})
export class AppModule {}
