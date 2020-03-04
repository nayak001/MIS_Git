import { AssessmentmasterModule } from './assessmentmaster.module';

describe('AssessmentmasterModule', () => {
  let assessmentmasterModule: AssessmentmasterModule;

  beforeEach(() => {
    assessmentmasterModule = new AssessmentmasterModule();
  });

  it('should create an instance', () => {
    expect(assessmentmasterModule).toBeTruthy();
  });
});
