import { TrainingMiscModule } from './trainingmisc.module';

describe('TrainingMiscModule', () => {
  let trainingMiscModule: TrainingMiscModule;

  beforeEach(() => {
    trainingMiscModule = new TrainingMiscModule();
  });

  it('should create an instance', () => {
    expect(trainingMiscModule).toBeTruthy();
  });
});