import { TestBed } from '@angular/core/testing';

import { HblactivityreportService } from './hblactivityreport.service';

describe('HblactivityreportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HblactivityreportService = TestBed.get(HblactivityreportService);
    expect(service).toBeTruthy();
  });
});
