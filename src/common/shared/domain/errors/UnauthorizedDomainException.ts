import { BaseDomainException } from './BaseDomainException';

export class UnauthorizedDomainException extends BaseDomainException {
  constructor(message: string, code = 'UNAUTHORIZED_ERROR') {
    super(message, code);
  }
}
