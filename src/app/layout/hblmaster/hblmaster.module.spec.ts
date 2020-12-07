import { HblmasterModule } from './hblmaster.module';

describe('IssuesModule', () => {
  let hblmasterModule: HblmasterModule;

  beforeEach(() => {
    hblmasterModule = new HblmasterModule();
  });

  it('should create an instance', () => {
    expect(hblmasterModule).toBeTruthy();
  });
});
