import { UsersregistrationpageModule } from './usersregistrationpage.module';

describe('UsersregistrationpageModule', () => {
  let usersregistrationpageModule: UsersregistrationpageModule;

  beforeEach(() => {
    usersregistrationpageModule = new UsersregistrationpageModule();
  });

  it('should create an instance', () => {
    expect(usersregistrationpageModule).toBeTruthy();
  });
});
