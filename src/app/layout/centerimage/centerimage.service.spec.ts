import { TestBed } from '@angular/core/testing';

import { CenterimageService } from './centerimage.service';

describe('CenterimageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CenterimageService = TestBed.get(CenterimageService);
    expect(service).toBeTruthy();
  });
});
