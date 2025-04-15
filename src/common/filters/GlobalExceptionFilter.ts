import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  Inject
} from '@nestjs/common';
import { Response } from 'express';
import { BaseDomainException } from '@common/shared/domain/errors/BaseDomainException';
import { ILogger } from '@common/shared/domain/ports/ILogger';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(@Inject('ILogger') private readonly logger: ILogger) {}
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    console.error('🔥 Global exception caught:', exception);

    this.logger.error(
      exception instanceof Error ? exception.message : 'Unknown error',
      exception instanceof Error ? exception.stack : '',
      'GlobalExceptionFilter'
    );

    if (exception instanceof BaseDomainException) {
      response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: exception.message,
        errorCode: exception.errorCode
      });
    } else if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const res = exception.getResponse();

      response.status(status).json(
        typeof res === 'string'
          ? {
              statusCode: status,
              message: res
            }
          : res
      );
    } else {
      response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: 'Internal server error',
        errorCode: 'INTERNAL_ERROR'
      });
    }
  }
}
