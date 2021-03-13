import { PreprogramtrainingModule } from './preprogramtrainingmodules.module';

describe('PreprogramtrainingModule', () => {
  let preprogramtrainingmodule: PreprogramtrainingModule;

  beforeEach(() => {
    preprogramtrainingmodule = new PreprogramtrainingModule();
  });

  it('should create an instance', () => {
    expect(preprogramtrainingmodule).toBeTruthy();
  });
});
