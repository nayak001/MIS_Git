import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PaymentinfoComponent } from './paymentinfo.component';
import { PaymentinfoModule } from './paymentinfo.module';

describe('PaymentinfoComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ PaymentinfoModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(PaymentinfoComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
