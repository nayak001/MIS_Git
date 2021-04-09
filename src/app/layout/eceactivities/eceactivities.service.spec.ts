import { TestBed } from '@angular/core/testing';

import { EceactivitiesService } from './eceactivities.service';

describe('EceactivitiesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EceactivitiesService = TestBed.get(EceactivitiesService);
    expect(service).toBeTruthy();
  });
});
