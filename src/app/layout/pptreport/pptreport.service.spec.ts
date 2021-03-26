import { TestBed } from '@angular/core/testing';

import { PptreportService } from './pptreport.service';

describe('PptreportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PptreportService = TestBed.get(PptreportService);
    expect(service).toBeTruthy();
  });
});
