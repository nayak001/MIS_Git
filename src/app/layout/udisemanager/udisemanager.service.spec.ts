import { TestBed } from '@angular/core/testing';

import { UdisemanagerService } from './udisemanager.service';

describe('UdisemanagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UdisemanagerService = TestBed.get(UdisemanagerService);
    expect(service).toBeTruthy();
  });
});
