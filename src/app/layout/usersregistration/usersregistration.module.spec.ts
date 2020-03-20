import { UsersregistrationModule } from './usersregistration.module';

describe('UsersregistrationModule', () => {
  let usersregistrationModule: UsersregistrationModule;

  beforeEach(() => {
    usersregistrationModule = new UsersregistrationModule();
  });

  it('should create an instance', () => {
    expect(usersregistrationModule).toBeTruthy();
  });
});
