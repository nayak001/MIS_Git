import { BlockdistrictModule } from './blockdistrict.module';

describe('BlockdistrictModule', () => {
  let blockdistrictModule: BlockdistrictModule;

  beforeEach(() => {
    blockdistrictModule = new BlockdistrictModule();
  });

  it('should create an instance', () => {
    expect(blockdistrictModule).toBeTruthy();
  });
});
