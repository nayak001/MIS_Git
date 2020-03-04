import { CentersAllocationModule } from './centers-allocation.module';

describe('CentersAllocationModule', () => {
  let centersAllocationModule: CentersAllocationModule;

  beforeEach(() => {
    centersAllocationModule = new CentersAllocationModule();
  });

  it('should create an instance', () => {
    expect(centersAllocationModule).toBeTruthy();
  });
});
