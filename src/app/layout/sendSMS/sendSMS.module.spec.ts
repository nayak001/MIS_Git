import { SendSMSModule } from './sendSMS.module';

describe('UsersModule', () => {
  let sendSMSModule: SendSMSModule;

  beforeEach(() => {
    sendSMSModule = new SendSMSModule();
  });

  it('should create an instance', () => {
    expect(sendSMSModule).toBeTruthy();
  });
});
