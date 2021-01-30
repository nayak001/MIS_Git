import { AllocatedcentersModule } from './allocatedcenters.module';

describe('AllocatedcentersModule', () => {
  let centersAllocationModule: AllocatedcentersModule;

  beforeEach(() => {
    centersAllocationModule = new AllocatedcentersModule();
  });

  it('should create an instance', () => {
    expect(centersAllocationModule).toBeTruthy();
  });
});
