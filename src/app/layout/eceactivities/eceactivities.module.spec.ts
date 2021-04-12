import { EceactivitiesModule } from './eceactivities.module';

describe('EceactivitiesModule', () => {
  let eceactivitiesModule: EceactivitiesModule;

  beforeEach(() => {
    eceactivitiesModule = new EceactivitiesModule();
  });

  it('should create an instance', () => {
    expect(eceactivitiesModule).toBeTruthy();
  });
});
