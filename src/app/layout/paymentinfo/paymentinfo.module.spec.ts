import { PaymentinfoModule } from './paymentinfo.module';

describe('PaymentinfoModule', () => {
  let paymentinfoModule: PaymentinfoModule;

  beforeEach(() => {
    paymentinfoModule = new PaymentinfoModule();
  });

  it('should create an instance', () => {
    expect(paymentinfoModule).toBeTruthy();
  });
});
