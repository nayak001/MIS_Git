import { TestBed } from '@angular/core/testing';

import { SurveymasterService } from './surveymaster.service';

describe('SurveymasterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SurveymasterService = TestBed.get(SurveymasterService);
    expect(service).toBeTruthy();
  });
});
