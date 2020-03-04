import { TestBed } from '@angular/core/testing';

import { MgroperationsService } from './mgroperations.service';

describe('MgroperationsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MgroperationsService = TestBed.get(MgroperationsService);
    expect(service).toBeTruthy();
  });
});
