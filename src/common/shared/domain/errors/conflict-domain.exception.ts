import { BaseDomainException } from './base-domain.exception';

export class ConflictDomainException extends BaseDomainException {
  constructor(message: string, code = 'CONFLICT_ERROR') {
    super(message, code);
  }
}
