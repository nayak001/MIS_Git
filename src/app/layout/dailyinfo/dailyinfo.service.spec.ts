import { TestBed } from '@angular/core/testing';

import { DailyinfoService } from './dailyinfo.service';

describe('DailyinfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DailyinfoService = TestBed.get(DailyinfoService);
    expect(service).toBeTruthy();
  });
});
