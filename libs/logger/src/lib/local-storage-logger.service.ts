import { Injectable } from '@angular/core';
import { bufferTime, Subject } from 'rxjs';
import { BaseLoggingServiceService } from './base-logging-service.service';
import { ESError } from './models/es-error.i';

@Injectable()
export class LocalStorageLoggerService extends BaseLoggingServiceService {
  errQueue$ = new Subject<ESError>();

  constructor() {
    console.log('Constructiong LocalStorageLoggerService');
    super();
    this.errQueue$.pipe(bufferTime(this.interval)).subscribe(errArray => {
      if (errArray && errArray.length > 0) {
        this.flushErr(errArray);
      }
    });
  }

  flushErr = (esErr: ESError[]): void => {
    console.log('LocalStorageLoggerService flushing errors');
    console.log(esErr);
    esErr.forEach(err => {
      this._loggingError(err);
    });
  };

  addErr = (err: ESError): void => {
    if (err) {
      this.errQueue$.next(err);
    }
  };

  private _loggingError(err: ESError): void {
    console.log('LocalStorageLoggerService logs:');
    localStorage.setItem('asdf', JSON.stringify(err));
  }
}
