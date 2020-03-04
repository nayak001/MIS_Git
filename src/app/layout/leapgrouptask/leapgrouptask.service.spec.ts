import { TestBed } from '@angular/core/testing';

import { LeapgrouptaskService } from './leapgrouptask.service';

describe('LeapgrouptaskService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LeapgrouptaskService = TestBed.get(LeapgrouptaskService);
    expect(service).toBeTruthy();
  });
});
