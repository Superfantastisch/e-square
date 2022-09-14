import { Inject, Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpResponse,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { ESquareLoggerService } from './e-square-logger.service';

import { InjectionToken } from '@angular/core';

export const MY_CONFIG = new InjectionToken<any>('myconfig');

export type MsgFormat = 'MyFormat';
export type Targets = 'Console' | 'localstorage';

export interface Config {
  format: MsgFormat;
  targets: Targets[];
  production: boolean;
}

export interface ESquareErrorMsg {
  msg: string;
  stackTrace: unknown;
  timeStamp: Date;
}

// export const loggerServiceFactory = (myconfig: any, logger: ESquareLoggerService) => new LoggerService(myconfig, logger);

@Injectable()
export class LoggerService implements HttpInterceptor {

  private _myConfig!: Config;

  constructor (
    // @Inject(MY_CONFIG) myconfig: any,
    private logger: ESquareLoggerService)
    {
      this._myConfig = {
        format: 'MyFormat',
        targets: ['Console'],
        production: true
      };
    }

  intercept(
    httpRequest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(httpRequest).pipe(
      map((res) => {
        return res;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log(this._myConfig);
        if (error.error instanceof ErrorEvent) {
          console.log('This is client side error');
          if (this._myConfig.production) {
            this.logger.writeError({
              msg: error.error.message,
              stackTrace: error.error,
              timeStamp: new Date()
            })
          }

        } else {
          if (this._myConfig.production) {
            this.logger.writeError({
              msg: error.error.message,
              stackTrace: error.error,
              timeStamp: new Date()
            })
          }
        }
        return throwError(error);
      })
    );
  }
}
