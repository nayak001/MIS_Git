import { TestBed } from '@angular/core/testing';

import { UsersregistrationpageService } from './usersregistrationpage.service';

describe('UsersregistrationpageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UsersregistrationpageService = TestBed.get(UsersregistrationpageService);
    expect(service).toBeTruthy();
  });
});
