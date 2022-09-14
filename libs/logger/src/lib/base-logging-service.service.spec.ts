import { TestBed } from '@angular/core/testing';

import { BaseLoggingServiceService } from './base-logging-service.service';

describe('BaseLoggingServiceService', () => {
  let service: BaseLoggingServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BaseLoggingServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
