import { TestBed } from '@angular/core/testing';

import { UserfeedbackService } from './userfeedback.service';

describe('UserfeedbackService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserfeedbackService = TestBed.get(UserfeedbackService);
    expect(service).toBeTruthy();
  });
});
