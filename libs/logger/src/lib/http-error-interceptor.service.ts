import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, EMPTY, map, Observable, throwError } from 'rxjs';
import { LoggerService } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorInterceptorService implements HttpInterceptor {

  constructor(private loggerService: LoggerService) {
    console.log('constructiong HttpErrorInterceptorService');
  }

  intercept(
    httpRequest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(httpRequest).pipe(
      map((res) => {
        return res;
      }),
      catchError((err: HttpErrorResponse) => {
        this.loggerService.logError(err);
        return throwError(EMPTY);
      })
      // catchError((error: HttpErrorResponse) => {
      //   console.log('The intercepted error');
      //   console.log(error);
      //   // if (error.error instanceof ErrorEvent) {
      //   //   console.log('This is client side error');
      //   //   if (this._myConfig.production) {
      //   //     this.logger.writeError({
      //   //       msg: error.error.message,
      //   //       stackTrace: error.error,
      //   //       timeStamp: new Date()
      //   //     })
      //   //   }

      //   // } else {
      //   //   if (this._myConfig.production) {
      //   //     this.logger.writeError({
      //   //       msg: error.error.message,
      //   //       stackTrace: error.error,
      //   //       timeStamp: new Date()
      //   //     })
      //   //   }
      //   // }
      //   return throwError(error);
      // })
    );
  }
}
