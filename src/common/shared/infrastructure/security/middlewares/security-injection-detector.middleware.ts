import {
  checkForLDAPInjection,
  checkForRute,
  checkForSqlInjection,
  checkForXSS,
  checkForXXE,
  sanitizeHeaders
} from '@common/shared/utils/security-injection-detector.util';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { SECURITY_INJECTION_DETECTOR_MESSAGES } from '@common/shared/constants/security-injection-detector-messages';
import { UnauthorizedDomainException } from '@common/shared/domain/errors/unauthorized-domain.exception';

@Injectable()
export class SecurityInjectionDetectorMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    const requestPartsToValidate = {
      body: req.body,
      params: req.params,
      query: req.query,
      headers: sanitizeHeaders(req.headers)
    };

    const attackChecks = [
      {
        check: checkForSqlInjection,
        message: SECURITY_INJECTION_DETECTOR_MESSAGES.VULNERARE_SECURITY
      },
      {
        check: checkForXSS,
        message: SECURITY_INJECTION_DETECTOR_MESSAGES.VULNERARE_SECURITY
      },
      {
        check: checkForXXE,
        message: SECURITY_INJECTION_DETECTOR_MESSAGES.VULNERARE_SECURITY
      },
      {
        check: checkForRute,
        message: SECURITY_INJECTION_DETECTOR_MESSAGES.VULNERARE_SECURITY
      },
      {
        check: checkForLDAPInjection,
        message: SECURITY_INJECTION_DETECTOR_MESSAGES.VULNERARE_SECURITY
      }
    ];

    Object.entries(requestPartsToValidate).forEach(([, partValue]) => {
      if (!partValue || Object.keys(partValue).length === 0) {
        return;
      }

      attackChecks.forEach(({ check, message }) => {
        if (check(partValue)) {
          throw new UnauthorizedDomainException(message, '!todo');
        }
      });
    });

    next();
  }
}
