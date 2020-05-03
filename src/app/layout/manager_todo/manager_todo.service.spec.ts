import { TestBed } from '@angular/core/testing';

import { Manager_todoService } from './manager_todo.service';

describe('Manager_todoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: Manager_todoService = TestBed.get(Manager_todoService);
    expect(service).toBeTruthy();
  });
});
