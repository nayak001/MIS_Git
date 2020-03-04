import { TestBed } from '@angular/core/testing';

import { PaymentinfoService } from './paymentinfo.service';

describe('PaymentinfoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PaymentinfoService = TestBed.get(PaymentinfoService);
    expect(service).toBeTruthy();
  });
});
