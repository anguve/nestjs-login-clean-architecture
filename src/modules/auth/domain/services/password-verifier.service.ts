import { Injectable } from '@nestjs/common';
import { UnauthorizedDomainException } from '@common/shared/domain/errors/unauthorized-domain.exception';
import { INVALID_CREDENTIALS_MESSAGE } from '@common/shared/constants/messages';
import { IPasswordVerifierPort } from '@auth/domain/port/password-verifier.port';

@Injectable()
export class PasswordVerifierService implements IPasswordVerifierPort {
  async verify(plain: string, stored: string): Promise<void> {
    if (plain !== stored) {
      throw new UnauthorizedDomainException(
        INVALID_CREDENTIALS_MESSAGE,
        INVALID_CREDENTIALS_MESSAGE
      );
    }
  }
}
