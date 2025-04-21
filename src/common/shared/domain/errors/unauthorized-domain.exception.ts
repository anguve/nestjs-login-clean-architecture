import { BaseDomainException } from './base-domain.exception';

export class UnauthorizedDomainException extends BaseDomainException {
  constructor(message: string, logMessage: string) {
    super(message, logMessage);
  }
}
