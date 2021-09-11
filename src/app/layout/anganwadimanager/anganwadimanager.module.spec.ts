import { UdisemanagerModule } from './udisemanager.module';

describe('UdisemanagerModule', () => {
  let udisemanagerModule: UdisemanagerModule;

  beforeEach(() => {
    udisemanagerModule = new UdisemanagerModule();
  });

  it('should create an instance', () => {
    expect(udisemanagerModule).toBeTruthy();
  });
});
