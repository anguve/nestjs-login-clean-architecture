import { BaseDomainException } from './base-domain.exception';

export class BadRequestDomainException extends BaseDomainException {
  constructor(message: string, code = 'BAD_REQUEST_ERROR') {
    super(message, code);
  }
}
