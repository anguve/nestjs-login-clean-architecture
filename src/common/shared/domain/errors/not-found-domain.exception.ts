import { BaseDomainException } from './base-domain.exception';

export class NotFoundDomainException extends BaseDomainException {
  constructor(message: string, code = 'NOT_FOUND_ERROR') {
    super(message, code);
  }
}
