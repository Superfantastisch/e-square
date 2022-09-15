import { TestBed } from '@angular/core/testing';
import { BaseLoggingServiceService } from './base-logging-service.service';
import { ConsoleLoggerService } from './console-logger.service';

import { LoggerService } from './logger.service';
import { LoggerConfig } from './models';

fdescribe('LoggerService', () => {
  let service: LoggerService;
  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [
        {
          provide: BaseLoggingServiceService,
          useClass: ConsoleLoggerService,
          multi: true
        },
        { provide: LoggerConfig, useValue: LoggerConfig }
      ]
    });
    service = TestBed.inject(LoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should log an error', () => {
    service.logError(new Error('Test Error'));
  });
});
