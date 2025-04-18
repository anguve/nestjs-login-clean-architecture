import { BaseDomainException } from './base-domain.exception';

export class UnauthorizedDomainException extends BaseDomainException {
  constructor(message: string, code = 'UNAUTHORIZED_ERROR') {
    super(message, code);
  }
}
