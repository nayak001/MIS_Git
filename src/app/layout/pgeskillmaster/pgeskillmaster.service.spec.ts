import { TestBed } from '@angular/core/testing';

import { PgskillmasterService } from './pgeskillmaster.service';

describe('PgskillmasterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PgskillmasterService = TestBed.get(PgskillmasterService);
    expect(service).toBeTruthy();
  });
});
