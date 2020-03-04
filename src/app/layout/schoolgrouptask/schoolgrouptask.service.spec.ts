import { TestBed } from '@angular/core/testing';

import { SchoolgrouptaskService } from './schoolgrouptask.service';

describe('SchoolgrouptaskService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SchoolgrouptaskService = TestBed.get(SchoolgrouptaskService);
    expect(service).toBeTruthy();
  });
});
