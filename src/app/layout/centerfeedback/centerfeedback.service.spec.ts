import { TestBed } from '@angular/core/testing';

import { CenterfeedbackService } from './centerfeedback.service';

describe('CenterfeedbackService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CenterfeedbackService = TestBed.get(CenterfeedbackService);
    expect(service).toBeTruthy();
  });
});
