import { CenterlocationModule } from './centerlocation.module';

describe('CenterlocationModule', () => {
  let centerlocationModule: CenterlocationModule;

  beforeEach(() => {
    centerlocationModule = new CenterlocationModule();
  });

  it('should create an instance', () => {
    expect(centerlocationModule).toBeTruthy();
  });
});
