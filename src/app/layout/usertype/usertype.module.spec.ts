import { UsertypeModule } from './usertype.module';

describe('CentersModule', () => {
  let usertypeModule: UsertypeModule;

  beforeEach(() => {
    usertypeModule = new UsertypeModule();
  });

  it('should create an instance', () => {
    expect(usertypeModule).toBeTruthy();
  });
});
