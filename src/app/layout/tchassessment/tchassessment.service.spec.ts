import { TestBed } from '@angular/core/testing';

import { TchassessmentService } from './tchassessment.service';

describe('TchassessmentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TchassessmentService = TestBed.get(TchassessmentService);
    expect(service).toBeTruthy();
  });
});
