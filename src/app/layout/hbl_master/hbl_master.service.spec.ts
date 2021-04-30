import { TestBed } from '@angular/core/testing';

import { hblMasterService } from './hbl_master.service';

describe('hblMasterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: hblMasterService = TestBed.get(hblMasterService);
    expect(service).toBeTruthy();
  });
});
