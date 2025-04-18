import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { Response } from 'express';
import { BaseDomainException } from '@common/shared/domain/errors/base-domain.exception';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    console.error('🔥 Global exception caught:', exception);
    const request = ctx.getRequest<Request>();

    const method = request.method;
    const url = request.url;
    const body = request.body;

    console.error('🔥 Global exception caught:');
    console.error('📍 Endpoint:', `${method} ${url}`);
    console.error('🧾 Body:', JSON.stringify(body, null, 2));
    console.error('❌ Error:', exception);
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
