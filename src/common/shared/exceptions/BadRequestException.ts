import { HttpStatus } from '@nestjs/common';
import { BaseErrorException } from '@common/shared/exceptions/BaseErrorException';

export class BadRequestException extends BaseErrorException {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST, 'BAD_REQUEST_ERROR');
  }
}
