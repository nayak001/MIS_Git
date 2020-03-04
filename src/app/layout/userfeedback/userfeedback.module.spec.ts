import { UserfeedbackModule } from './userfeedback.module';

describe('CentersModule', () => {
  let userfeedbackModule: UserfeedbackModule;

  beforeEach(() => {
    userfeedbackModule = new UserfeedbackModule();
  });

  it('should create an instance', () => {
    expect(userfeedbackModule).toBeTruthy();
  });
});
