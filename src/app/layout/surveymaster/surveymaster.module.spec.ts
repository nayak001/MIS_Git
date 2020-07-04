import { SurveymasterModule } from './surveymaster.module';

describe('SurveymasterModule', () => {
  let surveymasterModule: SurveymasterModule;

  beforeEach(() => {
    surveymasterModule = new SurveymasterModule();
  });

  it('should create an instance', () => {
    expect(surveymasterModule).toBeTruthy();
  });
});
