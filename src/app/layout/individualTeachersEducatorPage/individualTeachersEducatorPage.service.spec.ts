import { TestBed } from '@angular/core/testing';

import { IndividualTeachersEducatorPageService } from './individualTeachersEducatorPage.service';

describe('IndividualTeachersEducatorPageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IndividualTeachersEducatorPageService = TestBed.get(IndividualTeachersEducatorPageService);
    expect(service).toBeTruthy();
  });
});
