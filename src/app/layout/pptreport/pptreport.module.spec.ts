import { PptreportModule } from './pptreport.module';

describe('IssuesModule', () => {
  let pptreportModule: PptreportModule;

  beforeEach(() => {
    pptreportModule = new PptreportModule();
  });

  it('should create an instance', () => {
    expect(pptreportModule).toBeTruthy();
  });
});
