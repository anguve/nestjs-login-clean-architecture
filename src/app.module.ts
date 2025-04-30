import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { DatabaseModule } from '@common/shared/infrastructure/database/database.module';
import { SecurityInjectionDetectorMiddleware } from '@common/shared/infrastructure/security/middlewares/security-injection-detector.middleware';
import { AuthModule } from '@auth/auth.module';
import { UserRegistrationModule } from '@src/modules/user-registration/user-registration.module';

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
