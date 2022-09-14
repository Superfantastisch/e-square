import { Injectable } from '@angular/core';
import { bufferTime, Subject } from 'rxjs';
import { ESquareErrorMsg } from './logger.service';

@Injectable({
  providedIn: 'root'
})
export class ESquareLoggerService {
  private errQueue$ = new Subject();
  private errQueueLS$ = new Subject();
  private interval = 5000;

  private _errors: ESquareErrorMsg[] = [];

  constructor() {
    this.errQueue$.pipe(bufferTime(this.interval)).subscribe(errArray => {
        console.log(errArray);
    });
    this.errQueueLS$.pipe(bufferTime(this.interval)).subscribe(errArray => {
      errArray.forEach((val) => {
        localStorage.setItem('test', String(val));
      })
  });
  }

  writeError(err: ESquareErrorMsg) {
    this.errQueue$.next(err);
  }

  storeLogger(err: ESquareErrorMsg) {
    this.errQueueLS$.next(err);
  }
}
