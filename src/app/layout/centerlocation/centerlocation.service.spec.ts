import { TestBed } from '@angular/core/testing';

import { CenterlocationService } from './centerlocation.service';

describe('CenterlocationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CenterlocationService = TestBed.get(CenterlocationService);
    expect(service).toBeTruthy();
  });
});
