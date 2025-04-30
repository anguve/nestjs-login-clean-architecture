import { Injectable } from '@nestjs/common';
import { UnauthorizedDomainException } from '@common/shared/domain/errors/unauthorized-domain.exception';
import { INVALID_CREDENTIALS_MESSAGE } from '@common/shared/constants/messages';
import { IPasswordVerifierPort } from '@auth/domain/port/password-verifier.port';

@Injectable()
export class PasswordVerifierService implements IPasswordVerifierPort {
  /**
   * Verifies that the provided plain password matches the stored password.
   * @param plain - The plain text password input by the user.
   * @param stored - The hashed or stored password to compare against.
   * @throws UnauthorizedDomainException if the passwords do not match.
   */
  async verify(plain: string, stored: string): Promise<void> {
    if (plain !== stored) {
      const userMessage = INVALID_CREDENTIALS_MESSAGE;
      throw new UnauthorizedDomainException(userMessage, userMessage);
    }
  }
}
