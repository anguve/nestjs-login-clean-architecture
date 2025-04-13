import { HttpStatus } from '@nestjs/common';
import { BaseErrorException } from '@common/shared/exceptions/BaseErrorException';

export class NotFoundException extends BaseErrorException {
  constructor(message: string) {
    super(message, HttpStatus.NOT_FOUND, 'RESOURCE_NOT_FOUND');
  }
}
