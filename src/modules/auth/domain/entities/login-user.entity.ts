import { BaseUserEntity } from '@common/shared/domain/entities/base-user.entity';
import { UnauthorizedDomainException } from '@common/shared/domain/errors/unauthorized-domain.exception';
import { LoginUserEntityProps } from '@auth/domain/interfaces/login-user-entity.interface';
import { INVALID_CREDENTIALS_MESSAGE } from '@common/shared/constants/messages';

export class LoginUserEntity extends BaseUserEntity {
  constructor(props: LoginUserEntityProps) {
    super(props);
  }

  /**
   * Validates if the user is allowed to login.
   * Throws an UnauthorizedDomainException if the user is inactive or deleted.
   */
  canLogin(): void {
    if (!this.isActive || this.isDeleted) {
      const userMessage = INVALID_CREDENTIALS_MESSAGE;
      const technicalDetails = `Login denied for user ${this.email} due to status: isActive = ${this.isActive}, isDeleted = ${this.isDeleted}.`;
      throw new UnauthorizedDomainException(userMessage, technicalDetails);
    }
  }
}
