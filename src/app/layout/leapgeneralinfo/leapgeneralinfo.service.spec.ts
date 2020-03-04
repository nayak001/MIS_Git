import { TestBed } from '@angular/core/testing';

import { LeapgeneralinfoService } from './leapgeneralinfo.service';

describe('LeapgeneralinfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LeapgeneralinfoService = TestBed.get(LeapgeneralinfoService);
    expect(service).toBeTruthy();
  });
});
