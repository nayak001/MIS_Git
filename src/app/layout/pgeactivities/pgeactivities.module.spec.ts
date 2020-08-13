import { PgeactivitiesModule } from './pgeactivities.module';

describe('PgeactivitiesModule', () => {
  let pgeactivitiesModule: PgeactivitiesModule;

  beforeEach(() => {
    pgeactivitiesModule = new PgeactivitiesModule();
  });

  it('should create an instance', () => {
    expect(pgeactivitiesModule).toBeTruthy();
  });
});
