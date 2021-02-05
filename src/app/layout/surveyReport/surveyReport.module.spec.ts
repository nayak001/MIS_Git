import { CenterDetailsModule } from './centerDetails.module';

describe('CenterDetailsModule', () => {
  let CenterDetailsModule: CenterDetailsModule;

  beforeEach(() => {
    CenterDetailsModule = new CenterDetailsModule();
  });

  it('should create an instance', () => {
    expect(CenterDetailsModule).toBeTruthy();
  });
});
