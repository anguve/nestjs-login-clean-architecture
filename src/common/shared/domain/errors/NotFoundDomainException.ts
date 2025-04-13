import { BaseDomainException } from './BaseDomainException';

export class NotFoundDomainException extends BaseDomainException {
  constructor(message: string, code = 'NOT_FOUND_ERROR') {
    super(message, code);
  }
}
