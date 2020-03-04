import { TestBed } from '@angular/core/testing';

import { LeapindpracticeService } from './leapindpractice.service';

describe('LeapindpracticeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LeapindpracticeService = TestBed.get(LeapindpracticeService);
    expect(service).toBeTruthy();
  });
});
