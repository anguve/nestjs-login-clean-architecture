import { Injectable, Inject } from '@nestjs/common';
import {
  IJwtServicePort,
  I_JWT_SERVICE_PORT
} from '@common/shared/domain/ports/jwt-service.port';
import { ITokenGeneratorPort } from '@common/shared/domain/ports/token-generator.port';

@Injectable()
export class TokenService implements ITokenGeneratorPort {
  constructor(
    @Inject(I_JWT_SERVICE_PORT)
    private readonly jwt: IJwtServicePort
  ) {
    // Empty constructor: dependencies are injected here.
    // No additional logic is executed to keep single responsibility.
  }

  generate(id: string): Promise<string> {
    return this.jwt.sign({ id });
  }
}
