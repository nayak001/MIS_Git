import { TestBed } from '@angular/core/testing';

import { AnganwadimanagerService } from './anganwadimanager.service';

describe('AnganwadimanagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AnganwadimanagerService = TestBed.get(AnganwadimanagerService);
    expect(service).toBeTruthy();
  });
});
