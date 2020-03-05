import { ManagerDetailsModule } from './managerDetails.module';

describe('CenterDetailsModule', () => {
  let ManagerDetailsModule: ManagerDetailsModule;

  beforeEach(() => {
    ManagerDetailsModule = new ManagerDetailsModule();
  });

  it('should create an instance', () => {
    expect(ManagerDetailsModule).toBeTruthy();
  });
});
