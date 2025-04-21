import { BaseDomainException } from './base-domain.exception';

export class NotFoundDomainException extends BaseDomainException {
  constructor(message: string, logMessage: string) {
    super(message, logMessage);
  }
}
