import { DailyinfoModule } from './dailyinfo.module';

describe('DailyinfoModule', () => {
  let dailyinfoModule: DailyinfoModule;

  beforeEach(() => {
    dailyinfoeModule = new DailyinfoModule();
  });

  it('should create an instance', () => {
    expect(dailyinfoModule).toBeTruthy();
  });
});
