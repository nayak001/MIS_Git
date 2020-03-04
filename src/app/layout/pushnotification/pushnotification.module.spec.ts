import { PushnotificationModule } from './pushnotification.module';

describe('UsersModule', () => {
  let pushnotificationModule: PushnotificationModule;

  beforeEach(() => {
    pushnotificationModule = new PushnotificationModule();
  });

  it('should create an instance', () => {
    expect(pushnotificationModule).toBeTruthy();
  });
});
