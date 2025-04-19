import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { IJwtServicePort } from '@common/shared/domain/ports/jwt-service.port';
import { validatedEnvVars } from '@common/shared/infrastructure/config/envs';

@Injectable()
export class JwtAdapter implements IJwtServicePort {
  private readonly secret = validatedEnvVars.JWT_SECRET;

  async sign(payload: object): Promise<string> {
    return jwt.sign(payload, this.secret, {
      expiresIn: validatedEnvVars.JWT_EXPIRES_IN
    });
  }

  async verify<T>(token: string): Promise<T> {
    return jwt.verify(token, this.secret) as T;
  }
}
