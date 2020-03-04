import { TestBed } from '@angular/core/testing';

import { VersionmanagerService } from './versionmanager.service';

describe('VersionmanagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: VersionmanagerService = TestBed.get(VersionmanagerService);
    expect(service).toBeTruthy();
  });
});
