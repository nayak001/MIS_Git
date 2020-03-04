import { TchassessmentModule } from './tchassessment.module';

describe('TchassessmentModule', () => {
  let tchassessmentModule: TchassessmentModule;

  beforeEach(() => {
    tchassessmentModule = new TchassessmentModule();
  });

  it('should create an instance', () => {
    expect(tchassessmentModule).toBeTruthy();
  });
});
