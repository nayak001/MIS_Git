import { CentersModule } from './centers.module';

describe('CentersModule', () => {
  let centersModule: CentersModule;

  beforeEach(() => {
    centersModule = new CentersModule();
  });

  it('should create an instance', () => {
    expect(centersModule).toBeTruthy();
  });
});
