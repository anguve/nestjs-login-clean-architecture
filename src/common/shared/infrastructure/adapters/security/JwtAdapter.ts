import * as jwt from 'jsonwebtoken';
import { Injectable } from '@nestjs/common';
import { IJwtServicePort } from '@common/shared/domain/ports/IJwtServicePort';
import { validatedEnvVars } from '../../config/envs';

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
