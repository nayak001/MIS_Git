import { TestBed } from '@angular/core/testing';

import { SchoolindpracticeService } from './schoolindpractice.service';

describe('SchoolindpracticeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SchoolindpracticeService = TestBed.get(SchoolindpracticeService);
    expect(service).toBeTruthy();
  });
});
