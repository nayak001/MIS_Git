import { TestBed } from '@angular/core/testing';

import { Teacherreportperformanceservice } from './teacherperformancereportservice.service';

describe('Teacherreportperformanceservice', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Teacherreportperformanceservice = TestBed.get(Teacherreportperformanceservice);
    expect(service).toBeTruthy();
  });
});
