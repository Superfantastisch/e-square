import { Injectable, Optional } from '@angular/core';
import { LoggerConfig } from './models';
export interface ESquareErrorMsg {
  msg: string;
  stackTrace: unknown;
  timeStamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class LoggerService {

  private _config!: LoggerConfig;

  constructor (@Optional() config?: LoggerConfig) {
    this._config = config || { format: 'Default', targets: ['Console', 'LocalStorage'], production: false };
    console.log('Config:');
    console.log(this._config);
  }

  logError(err: Error) {
    if (this._config.production && err) {
      console.log('error');
      console.log(err);
    }
  }
}
