import { HttpException, HttpStatus } from '@nestjs/common';

export class BaseErrorException extends HttpException {
  constructor(
    message: string,
    statusCode: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
    errorCode?: string
  ) {
    super(
      {
        statusCode,
        message,
        errorCode: errorCode ?? 'UNKNOWN_ERROR'
      },
      statusCode
    );
  }
}
