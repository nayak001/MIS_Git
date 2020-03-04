import { TestBed } from '@angular/core/testing';

import { CentersAllocationService } from './centers-allocation.service';

describe('CentersAllocationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CentersAllocationService = TestBed.get(CentersAllocationService);
    expect(service).toBeTruthy();
  });
});
