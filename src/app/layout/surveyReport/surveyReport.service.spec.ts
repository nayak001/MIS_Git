import { TestBed } from '@angular/core/testing';

import { CenterDetailsService } from './centerDetails.service';

describe('CenterDetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CenterDetailsService = TestBed.get(CenterDetailsService);
    expect(service).toBeTruthy();
  });
});
