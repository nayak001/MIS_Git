import { TestBed } from '@angular/core/testing';

import { SchoolgeninfoService } from './schoolgeninfo.service';

describe('SchoolgeninfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SchoolgeninfoService = TestBed.get(SchoolgeninfoService);
    expect(service).toBeTruthy();
  });
});
