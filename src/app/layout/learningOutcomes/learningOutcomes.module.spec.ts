import { LearningOutcomesModule } from './learningOutcomes.module';

describe('CenterDetailsModule', () => {
  let LearningOutcomesModule: LearningOutcomesModule;

  beforeEach(() => {
    LearningOutcomesModule = new LearningOutcomesModule();
  });

  it('should create an instance', () => {
    expect(LearningOutcomesModule).toBeTruthy();
  });
});
