import { ModuleWithProviders, NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggerConfig } from './models';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptorService } from './http-error-interceptor.service';

@NgModule({
  imports: [CommonModule, RouterModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptorService, multi: true }
  ],
  exports: []
})
export class LoggerModule {
  constructor(@Optional() @SkipSelf() parentModule?: LoggerModule) {
    if (parentModule) {
      throw new Error(
        'LoggerModule is already loaded. Import it in the AppModule only');
    }
  }
  static forRoot(config: LoggerConfig): ModuleWithProviders<LoggerModule> {
    return {
      ngModule: LoggerModule,
      providers: [
        { provide: LoggerConfig, useValue: config }
      ]
    };
  }
}
