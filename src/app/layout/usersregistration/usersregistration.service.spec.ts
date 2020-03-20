import { TestBed } from '@angular/core/testing';

import { UsersregistrationService } from './usersregistration.service';

describe('UsersregistrationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsersregistrationService = TestBed.get(UsersregistrationService);
    expect(service).toBeTruthy();
  });
});
