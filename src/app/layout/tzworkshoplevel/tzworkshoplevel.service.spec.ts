import { TestBed } from '@angular/core/testing';

import { TzworkshoplevelService } from './tzworkshoplevel.service';

describe('TzworkshoplevelService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TzworkshoplevelService = TestBed.get(TzworkshoplevelService);
    expect(service).toBeTruthy();
  });
});
