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

export const LoggerMap = new Map<Targets, any>([
  ['Console', ConsoleLoggerService],
  ['LocalStorage', LocalStorageLoggerService]
]);

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
    if (config?.targets && config.targets.length > 0) {
      config.targets.forEach((target) => {
        myProvider.push({
          provide: BaseLoggingServiceService,
          useClass: LoggerMap.get(target),
          multi: true
        });
      });
    } else {
      myProvider.push({
        provide: BaseLoggingServiceService,
        useClass: ConsoleLoggerService,
        multi: true,
      });
    }

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
