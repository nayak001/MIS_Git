import { TestBed } from '@angular/core/testing';

import { StudentDetailsPageService } from './studentDetailsPage.service';

describe('StudentDetailsPageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: studentDetailsPageService = TestBed.get(StudentDetailsPageService);
    expect(service).toBeTruthy();
  });
});
