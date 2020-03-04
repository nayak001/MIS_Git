import { TestBed } from '@angular/core/testing';

import { TchactivityService } from './tchactivity.service';

describe('TchactivityService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TchactivityService = TestBed.get(TchactivityService);
    expect(service).toBeTruthy();
  });
});
