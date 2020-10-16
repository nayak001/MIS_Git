import { HblactivityreportModule } from './hblactivityreport.module';

describe('IssuesModule', () => {
  let hblactivityreportModule: HblactivityreportModule;

  beforeEach(() => {
    hblactivityreportModule = new HblactivityreportModule();
  });

  it('should create an instance', () => {
    expect(hblactivityreportModule).toBeTruthy();
  });
});
