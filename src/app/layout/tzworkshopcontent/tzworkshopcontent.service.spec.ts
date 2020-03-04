import { TestBed } from '@angular/core/testing';

import { TzworkshopcontentService } from './tzworkshopcontent.service';

describe('TzworkshopcontentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TzworkshopcontentService = TestBed.get(TzworkshopcontentService);
    expect(service).toBeTruthy();
  });
});
