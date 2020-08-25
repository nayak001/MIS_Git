import { TestBed } from '@angular/core/testing';

import { PgeactivitiesService } from './pgeactivities.service';

describe('PgeactivitiesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PgeactivitiesService = TestBed.get(PgeactivitiesService);
    expect(service).toBeTruthy();
  });
});
