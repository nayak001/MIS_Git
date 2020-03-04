import { TestBed } from '@angular/core/testing';

import { BaselinetestService } from './baselinetest.service';

describe('BaselinetestService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BaselinetestService = TestBed.get(baselinetestService);
    expect(service).toBeTruthy();
  });
});
