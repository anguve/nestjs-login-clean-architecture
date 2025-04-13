import { BaseDomainException } from './BaseDomainException';

export class ConflictDomainException extends BaseDomainException {
  constructor(message: string, code = 'CONFLICT_ERROR') {
    super(message, code);
  }
}
