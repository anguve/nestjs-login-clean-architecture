import { Injectable } from '@nestjs/common';
import { UnauthorizedDomainException } from '@src/common/shared/domain/errors/unauthorized-domain.exception';
import { IPasswordVerifierPort } from '@auth/domain/port/password-verifier.port';

@Injectable()
export class PasswordVerifierService implements IPasswordVerifierPort {
  async verify(plain: string, stored: string): Promise<void> {
    if (plain !== stored) {
      throw new UnauthorizedDomainException(
        'Usuario o contraseña incorrectos.',
        'La contraseña proporcionada es incorrecta.'
      );
    }
  }
}
