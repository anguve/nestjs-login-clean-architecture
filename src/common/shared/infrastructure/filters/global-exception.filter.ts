import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { Response } from 'express';
import { ValidationError } from 'class-validator';
import { BaseDomainException } from '@common/shared/domain/errors/base-domain.exception';

interface ErrorResponse {
  message: string;
  success: boolean;
  data: Record<string, unknown>;
}

interface HttpExceptionResponse {
  message?: string | string[] | ValidationError[];
  [key: string]: unknown;
}

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    /*   const request = ctx.getRequest<Request>(); */

    // Log the error
    /*     this.logError(exception, request); */

    // Handle different types of exceptions
    if (exception instanceof BaseDomainException) {
      this.handleDomainException(exception, response);
    } else if (exception instanceof HttpException) {
      this.handleHttpException(exception, response);
    } else {
      this.handleUnknownException(response);
    }
  }

  /*   private logError(exception: unknown, request: Request): void {
    console.error('🔥 Global exception caught:', exception);
    console.error('📍 Endpoint:', `${request.method} ${request.url}`);
    console.error('🧾 Body:', JSON.stringify(request.body, null, 2));
    console.error('❌ Error:', exception);
  } */

  private sendResponse(
    response: Response,
    status: number,
    message: string
  ): void {
    response.status(status).json({
      message,
      success: false,
      data: {}
    } as ErrorResponse);
  }

  private handleDomainException(
    exception: BaseDomainException,
    response: Response
  ): void {
    this.sendResponse(response, HttpStatus.BAD_REQUEST, exception.message);
  }

  private handleHttpException(
    exception: HttpException,
    response: Response
  ): void {
    const status = exception.getStatus();
    const res = exception.getResponse() as HttpExceptionResponse | string;

    if (typeof res === 'string') {
      this.sendResponse(response, status, res);
      return;
    }

    if (status === HttpStatus.BAD_REQUEST && Array.isArray(res.message)) {
      const validationMessage = this.handleValidationErrors(res.message);
      this.sendResponse(response, status, validationMessage);
      return;
    }

    const errorMessage =
      typeof res.message === 'string' ? res.message : 'An error occurred';
    this.sendResponse(response, status, errorMessage);
  }

  private handleValidationErrors(
    messages: (string | ValidationError)[]
  ): string {
    const errorMessages = messages
      .map((error) => {
        if (typeof error === 'string') {
          return error;
        }
        if (error instanceof ValidationError) {
          return Object.values(error.constraints || {}).join(', ');
        }
        return null;
      })
      .filter((msg): msg is string => Boolean(msg))
      .join('; ');

    return errorMessages || 'Validation failed';
  }

  private handleUnknownException(response: Response): void {
    this.sendResponse(
      response,
      HttpStatus.INTERNAL_SERVER_ERROR,
      'Internal server error'
    );
  }
}
