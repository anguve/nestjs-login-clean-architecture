import { Module } from '@nestjs/common';
import { AuthController } from '@auth/infrastructure/controllers/AuthController';

@Module({
  controllers: [AuthController],
  providers: []
})
export class AuthModule {}
