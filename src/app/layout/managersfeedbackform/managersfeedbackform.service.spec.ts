import { TestBed } from '@angular/core/testing';

import { ManagersfeedbackformService } from './managersfeedbackform.service';

describe('ManagersfeedbackformService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManagersfeedbackformService = TestBed.get(ManagersfeedbackformService);
    expect(service).toBeTruthy();
  });
});
