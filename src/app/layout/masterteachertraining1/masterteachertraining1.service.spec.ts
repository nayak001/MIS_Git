import { TestBed } from '@angular/core/testing';

import { Masterteachertraining1Service } from './masterteachertraining1.service';

describe('Masterteachertraining1Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Masterteachertraining1Service = TestBed.get(Masterteachertraining1Service);
    expect(service).toBeTruthy();
  });
});
