import { Inject, Injectable, Optional } from '@angular/core';
import { BaseLoggingServiceService } from './base-logging-service.service';
import { LoggerConfig } from './models';
import { ESError } from './models/es-error.i';

@Injectable({
  providedIn: 'root',
})
export class LoggerService {
  private _config!: LoggerConfig;
  private _loggers!: BaseLoggingServiceService[];

  constructor(
    @Inject(BaseLoggingServiceService) loggers: BaseLoggingServiceService[],
    @Optional() config?: LoggerConfig
  ) {
    this._loggers = loggers;
    this._config = config || {
      format: 'Default',
      targets: ['Console', 'LocalStorage'],
      production: false,
      interval: 5000
    };
    console.log('Config:');
    console.log(this._config);
  }

  logError(err: Error) {
    if (this._config.production && err) {
      // console.log('error');
      // console.log(err);
      // console.log('base logging service');
      // console.log(this._loggers);
      this._loggers.forEach(logger => {
        logger.addErr(this._createESError(err));
      })
    }
  }

  private _createESError(err: Error): ESError {
    return {
      msg: err?.message || 'no error message',
      stackTrace: err?.stack || 'no stack trace',
      timeStamp: new Date()
    }
  }
}
