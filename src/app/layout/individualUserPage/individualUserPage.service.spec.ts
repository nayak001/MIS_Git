import { TestBed } from '@angular/core/testing';

import { IndividualUserPageService } from './individualUserPage.service';

describe('IndividualUserPageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: individualUserPageService = TestBed.get(IndividualUserPageService);
    expect(service).toBeTruthy();
  });
});
