import { TestBed } from '@angular/core/testing';

import { ESquareLoggerService } from './e-square-logger.service';

describe('ESquareLoggerService', () => {
  let service: ESquareLoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ESquareLoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
