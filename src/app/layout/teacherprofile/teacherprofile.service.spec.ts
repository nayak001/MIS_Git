import { TestBed } from '@angular/core/testing';

import { TeacherprofileService } from './teacherprofile.service';

describe('TeacherprofileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TeacherprofileService = TestBed.get(TeacherprofileService);
    expect(service).toBeTruthy();
  });
});
