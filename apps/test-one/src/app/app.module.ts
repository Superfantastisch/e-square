import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LoggerModule } from '@e-square/logger';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    LoggerModule.forRoot({
      format: 'Default',
      targets: ['Console', 'LocalStorage'],
      production: !environment.production // using development for testing
    })
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
