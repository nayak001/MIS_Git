import { ManagersfeedbackformModule } from './managersfeedbackform.module';

describe('ManagersfeedbackformModule', () => {
  let managersfeedbackformModule: ManagersfeedbackformModule;

  beforeEach(() => {
    managersfeedbackformModule = new ManagersfeedbackformModule();
  });

  it('should create an instance', () => {
    expect(managersfeedbackformModule).toBeTruthy();
  });
});
