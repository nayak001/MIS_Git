import { TestBed } from '@angular/core/testing';

import { TchbaselineService } from './tchbaseline.service';

describe('TchbaselineService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TchbaselineService = TestBed.get(TchbaselineService);
    expect(service).toBeTruthy();
  });
});
