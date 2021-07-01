import { TestBed } from '@angular/core/testing';

import { PostcallactivitiesService } from './postcallactivities.service';

describe('PostcallactivitiesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PostcallactivitiesService = TestBed.get(PostcallactivitiesService);
    expect(service).toBeTruthy();
  });
});
