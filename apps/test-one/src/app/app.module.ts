import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  ESquareLoggerService,
  LoggerService,
  MY_CONFIG,
  MsgFormat,
} from '@e-square/logger';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: LoggerService, multi: true }],
  // providers: [
  //   {
  //     provide: 'MY_CONFIG',
  //     useValue: {
  //       format: 'MyFormat',
  //       targets: ['Console'],
  //     },
  //   },
  //   {
  //     provide: HTTP_INTERCEPTORS,
  //     useFactory: loggerServiceFactory,
  //     deps: [MY_CONFIG, ESquareLoggerService],
  //     multi: true,
  //   },
  // ],
  bootstrap: [AppComponent],
})
export class AppModule {}
