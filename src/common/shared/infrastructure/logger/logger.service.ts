import { Injectable, Inject } from '@nestjs/common';
import { Logger } from 'winston';

import { ILogger } from '@common/shared/domain/ports/ILogger';

@Injectable()
export class CustomLoggerService implements ILogger {
  constructor(@Inject('WINSTON_LOGGER') private readonly logger: Logger) {}

  log(message: string, context?: string) {
    this.logger.info(message, { context });
  }

  error(message: string, trace?: string, context?: string) {
    this.logger.error(message, { trace, context });
  }

  warn(message: string, context?: string) {
    this.logger.warn(message, { context });
  }

  debug(message: string, context?: string) {
    this.logger.debug(message, { context });
  }
}
