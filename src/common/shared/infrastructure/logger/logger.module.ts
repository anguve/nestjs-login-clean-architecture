import { Module } from '@nestjs/common';
import { WinstonModule } from 'nest-winston';

import { CustomLoggerService } from './logger.service';
import { winstonConfig } from '../config/logger.config';

@Module({
  imports: [WinstonModule.forRoot(winstonConfig)],
  providers: [
    {
      provide: 'ILogger',
      useClass: CustomLoggerService
    },
    {
      provide: 'WINSTON_LOGGER',
      useExisting: 'winston'
    }
  ],
  exports: ['ILogger']
})
export class LoggerModule {}
