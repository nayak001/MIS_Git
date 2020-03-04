import { VersionmanagerModule } from './versionmanager.module';

describe('VersionmanagerModule', () => {
  let versionmanagerModule: VersionmanagerModule;

  beforeEach(() => {
    versionmanagerModule = new VersionmanagerModule();
  });

  it('should create an instance', () => {
    expect(versionmanagerModule).toBeTruthy();
  });
});
