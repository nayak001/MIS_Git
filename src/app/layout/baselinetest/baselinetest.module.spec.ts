import { BaselinetestModule } from './baselinetest.module';

describe('UsersModule', () => {
  let baselinetestModule: BaselinetestModule;

  beforeEach(() => {
    baselinetestModule = new BaselinetestModule();
  });

  it('should create an instance', () => {
    expect(baselinetestModule).toBeTruthy();
  });
});
