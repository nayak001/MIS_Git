import { TestBed } from '@angular/core/testing';

import { LearningOutcomesService } from './learningOutcomes.service';

describe('LearningOutcomesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: learningOutcomesService = TestBed.get(LearningOutcomesService);
    expect(service).toBeTruthy();
  });
});
