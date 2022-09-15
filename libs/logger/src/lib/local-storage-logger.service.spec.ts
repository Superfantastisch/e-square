import { TestBed } from '@angular/core/testing';

import { LocalStorageLoggerService } from './local-storage-logger.service';

describe('LocalStorageLoggerService', () => {
  let service: LocalStorageLoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalStorageLoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
