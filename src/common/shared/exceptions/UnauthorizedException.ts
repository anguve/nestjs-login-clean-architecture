import { HttpStatus } from '@nestjs/common';
import { BaseErrorException } from '@common/shared/exceptions/BaseErrorException';
export class UnauthorizedError extends BaseErrorException {
  constructor(message: string) {
    super(message, HttpStatus.UNAUTHORIZED, 'UNAUTHORIZED');
  }
}
