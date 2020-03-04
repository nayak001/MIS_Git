import { TestBed } from '@angular/core/testing';

import { CommunityvisitService } from './communityvisit.service';

describe('CommunityvisitService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CommunityvisitService = TestBed.get(CommunityvisitService);
    expect(service).toBeTruthy();
  });
});
