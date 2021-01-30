import { TestBed } from '@angular/core/testing';

import { AllocatedcentersService } from './allocatedcenters.service';

describe('AllocatedcentersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AllocatedcentersService = TestBed.get(AllocatedcentersService);
    expect(service).toBeTruthy();
  });
});
