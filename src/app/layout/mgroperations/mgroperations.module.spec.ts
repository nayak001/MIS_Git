import { MgroperationsModule } from './mgroperations.module';

describe('MgroperationsModule', () => {
  let mgroperationsModule: MgroperationsModule;

  beforeEach(() => {
    mgroperationsModule = new MgroperationsModule();
  });

  it('should create an instance', () => {
    expect(mgroperationsModule).toBeTruthy();
  });
});
