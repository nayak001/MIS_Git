import { TestBed } from '@angular/core/testing';

import { AssessmentmasterService } from './assessmentmaster.service';

describe('AssessmentmasterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssessmentmasterService = TestBed.get(AssessmentmasterService);
    expect(service).toBeTruthy();
  });
});
