import { TestBed } from '@angular/core/testing';

import { PushnotificationService } from './pushnotification.service';

describe('PushnotificationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PushnotificationService = TestBed.get(PushnotificationService);
    expect(service).toBeTruthy();
  });
});
