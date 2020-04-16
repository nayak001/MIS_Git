import { TestBed } from '@angular/core/testing';

import { SkillchartfileuploadService } from './skillchartfileupload.service';

describe('SkillchartfileuploadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SkillchartfileuploadService = TestBed.get(SkillchartfileuploadService);
    expect(service).toBeTruthy();
  });
});
