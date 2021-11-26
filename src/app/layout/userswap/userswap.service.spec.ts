import { TestBed } from '@angular/core/testing';

import { UserswapService } from './userswap.service';

describe('UserswapService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserswapService = TestBed.get(UserswapService);
    expect(service).toBeTruthy();
  });
});
