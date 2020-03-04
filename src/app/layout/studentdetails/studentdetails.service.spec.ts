import { TestBed } from '@angular/core/testing';

import { StudentdetailsService } from './studentdetails.service';

describe('StudentdetailsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StudentdetailsService = TestBed.get(StudentdetailsService);
    expect(service).toBeTruthy();
  });
});
