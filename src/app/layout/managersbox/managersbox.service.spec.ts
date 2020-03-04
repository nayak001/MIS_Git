import { TestBed } from '@angular/core/testing';

import { ManagersboxService } from './managersbox.service';

describe('ManagersboxService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManagersboxService = TestBed.get(ManagersboxService);
    expect(service).toBeTruthy();
  });
});
