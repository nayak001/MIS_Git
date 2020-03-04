import { AssessmentinfoModule } from './assessmentinfo.module';

describe('AssessmentinfoModule', () => {
  let assessmentinfoModule: AssessmentinfoModule;

  beforeEach(() => {
    assessmentinfoModule = new AssessmentinfoModule();
  });

  it('should create an instance', () => {
    expect(assessmentinfoModule).toBeTruthy();
  });
});
