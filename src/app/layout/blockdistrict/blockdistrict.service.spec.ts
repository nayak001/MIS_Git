import { TestBed } from '@angular/core/testing';

import { BlockdistrictService } from './blockdistrict.service';

describe('BlockdistrictService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BlockdistrictService = TestBed.get(BlockdistrictService);
    expect(service).toBeTruthy();
  });
});
