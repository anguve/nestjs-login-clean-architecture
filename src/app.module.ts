import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UserRegistrationModule } from './modules/user-registration/register-users.module';
import { DatabaseModule } from './common/shared/infrastructure/database/database.module';
import { SecurityInjectionDetectorMiddleware } from '@common/shared/infrastructure/security/middlewares/security-injection-detector.middleware';

@Module({
  imports: [AuthModule, UserRegistrationModule, DatabaseModule],
  controllers: [],
  providers: []
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SecurityInjectionDetectorMiddleware).forRoutes({
      path: '*',
      method: RequestMethod.ALL
    });
  }
}
