import { HttpStatus } from '@nestjs/common';
import { BaseErrorException } from '@common/shared/exceptions/BaseErrorException';
export class ConflictError extends BaseErrorException {
  constructor(message: string) {
    super(message, HttpStatus.CONFLICT, 'CONFLICT_ERROR');
  }
}
