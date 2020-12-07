import { TestBed } from '@angular/core/testing';

import { HblmasterService } from './hblmaster.service';

describe('HblmasterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HblmasterService = TestBed.get(HblmasterService);
    expect(service).toBeTruthy();
  });
});
