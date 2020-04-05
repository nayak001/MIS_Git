import { TestBed } from '@angular/core/testing';

import { Mastermanagertraining1Service } from './mastermanagertraining1.service';

describe('Mastermanagertraining1Service', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Mastermanagertraining1Service = TestBed.get(Mastermanagertraining1Service);
    expect(service).toBeTruthy();
  });
});
