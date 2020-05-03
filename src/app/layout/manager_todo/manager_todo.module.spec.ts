import { Manager_todoModule } from './manager_todo.module';

describe('Manager_todoModule', () => {
  let manager_todoModule: Manager_todoModule;

  beforeEach(() => {
    manager_todoModule = new Manager_todoModule();
  });

  it('should create an instance', () => {
    expect(manager_todoModule).toBeTruthy();
  });
});
