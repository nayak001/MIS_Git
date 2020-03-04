import { ManagersboxModule } from './managersbox.module';

describe('ManagersboxModule', () => {
  let managersboxModule: ManagersboxModule;

  beforeEach(() => {
    managersboxModule = new ManagersboxModule();
  });

  it('should create an instance', () => {
    expect(managersboxModule).toBeTruthy();
  });
});
