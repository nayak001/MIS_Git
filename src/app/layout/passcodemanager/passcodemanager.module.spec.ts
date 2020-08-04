import { PasscodemanagerModule } from './passcodemanager.module';

describe('PasscodemanagerModule', () => {
  let passcodemanagerModule: PasscodemanagerModule;

  beforeEach(() => {
    passcodemanagerModule = new PasscodemanagerModule();
  });

  it('should create an instance', () => {
    expect(passcodemanagerModule).toBeTruthy();
  });
});