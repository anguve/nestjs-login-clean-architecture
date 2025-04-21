import { BaseDomainException } from './base-domain.exception';

export class BadRequestDomainException extends BaseDomainException {
  constructor(message: string, logMessage: string) {
    super(message, logMessage);
  }
}
