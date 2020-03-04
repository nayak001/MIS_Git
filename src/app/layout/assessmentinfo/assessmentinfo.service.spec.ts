import { TestBed } from '@angular/core/testing';

import { AssessmentinfoService } from './assessmentinfo.service';

describe('AssessmentinfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssessmentinfoService = TestBed.get(AssessmentinfoService);
    expect(service).toBeTruthy();
  });
});
