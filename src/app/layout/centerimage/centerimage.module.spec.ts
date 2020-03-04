import { CenterimageModule } from './centerimage.module';

describe('CenterimageModule', () => {
  let centerimageModule: CenterimageModule;

  beforeEach(() => {
    centerimageModule = new CenterimageModule();
  });

  it('should create an instance', () => {
    expect(centerimageModule).toBeTruthy();
  });
});
