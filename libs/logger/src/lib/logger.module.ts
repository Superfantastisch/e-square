import {
  ModuleWithProviders,
  NgModule,
  Optional,
  Provider,
  SkipSelf,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoggerConfig, Targets } from './models';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpErrorInterceptorService } from './http-error-interceptor.service';
import { BaseLoggingServiceService } from './base-logging-service.service';
import { ConsoleLoggerService } from './console-logger.service';
import { LocalStorageLoggerService } from './local-storage-logger.service';

@NgModule({
  imports: [CommonModule, RouterModule],
  providers: [],
  exports: [],
})
export class LoggerModule {
  constructor(@Optional() @SkipSelf() parentModule?: LoggerModule) {
    if (parentModule) {
      throw new Error(
        'LoggerModule is already loaded. Import it in the AppModule only'
      );
    }
  }
  static forRoot(config: LoggerConfig): ModuleWithProviders<LoggerModule> {
    const myProvider: Provider[] = [];
    console.log('forRoot config settings');
    console.log(config);
    if (config?.targets) {
      config.targets.forEach((target) => {
        switch (target) {
          case 'Console':
            console.log('target is Console');
            myProvider.push({
              provide: BaseLoggingServiceService,
              useClass: ConsoleLoggerService,
              multi: true,
            });
            break;
          case 'LocalStorage':
            console.log('target is Local Storage');
            myProvider.push({
              provide: BaseLoggingServiceService,
              useClass: LocalStorageLoggerService,
              multi: true,
            });
            break;

          default:
            break;
        }
      });
    }
    console.log('providers');
    console.log(myProvider);
    return {
      ngModule: LoggerModule,
      providers: [
        ...myProvider,
        { provide: LoggerConfig, useValue: config },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpErrorInterceptorService,
          multi: true,
        }
      ],
    };
  }
}
