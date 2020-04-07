import { TestBed } from '@angular/core/testing';

import { SendSMSService } from './sendSMS.service';

describe('SendSMSService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SendSMSService = TestBed.get(SendSMSService);
    expect(service).toBeTruthy();
  });
});
