import { TestBed } from '@angular/core/testing';

import { MasterteacherassesmentService } from './masterteacherassesment.service';

describe('MasterteacherassesmentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MasterteacherassesmentService = TestBed.get(MasterteacherassesmentService);
    expect(service).toBeTruthy();
  });
});
