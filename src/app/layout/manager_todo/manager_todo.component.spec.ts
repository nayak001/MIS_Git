import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { Manager_todoComponent } from './manager_todo.component';
import { Manager_todoModule } from './manager_todo.module';

describe('Manager_todoComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ Manager_todoModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(Manager_todoComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
