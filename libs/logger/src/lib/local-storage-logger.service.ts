import { Injectable } from '@angular/core';
import { bufferTime, Subject } from 'rxjs';
import { BaseLoggingServiceService } from './base-logging-service.service';
import { ESError } from './models/es-error.i';
import { v4 as uuid } from 'uuid';

@Injectable()
export class LocalStorageLoggerService extends BaseLoggingServiceService {
  errQueue$ = new Subject<ESError>();

  constructor() {
    super();
    this.errQueue$.pipe(bufferTime(this.interval)).subscribe(errArray => {
      if (errArray && errArray.length > 0) {
        this.flushErr(errArray);
      }
    });
  }

  flushErr = (esErr: ESError[]): void => {
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
    localStorage.setItem(uuid(), JSON.stringify(err));
  }
}
