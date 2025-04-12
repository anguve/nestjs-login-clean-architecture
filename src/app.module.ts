import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { RegisterUsersModule } from './modules/user-registration/register-users.module';

@Module({
  imports: [AuthModule, RegisterUsersModule],
  controllers: [],
  providers: []
})
export class AppModule {}
