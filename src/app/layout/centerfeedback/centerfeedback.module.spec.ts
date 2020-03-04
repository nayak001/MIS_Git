import { CenterfeedbackModule } from './centerfeedback.module';

describe('IssuesModule', () => {
  let centerfeedbackModule: CenterfeedbackModule;

  beforeEach(() => {
    centerfeedbackModule = new CenterfeedbackModule();
  });

  it('should create an instance', () => {
    expect(centerfeedbackModule).toBeTruthy();
  });
});
