import { MasterteacherassesmentModule } from './masterteacherassesment.module';

describe('MasterteacherassesmentModule', () => {
  let masterteacherassesmentModule: MasterteacherassesmentModule;

  beforeEach(() => {
    masterteacherassesmentModule = new MasterteacherassesmentModule();
  });

  it('should create an instance', () => {
    expect(MasterteacherassesmentModule).toBeTruthy();
  });
});
