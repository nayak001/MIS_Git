import { UsersessionModule } from './usersession.module';

describe('CentersModule', () => {
  let usersessionModule: UsersessionModule;

  beforeEach(() => {
    usersessionModule = new UsersessionModule();
  });

  it('should create an instance', () => {
    expect(usersessionModule).toBeTruthy();
  });
});
