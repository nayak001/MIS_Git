import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { UsersessionComponent } from './usersession.component';
import { UsersessionModule } from './usersession.module';

describe('UsersessionComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ UsersessionModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(UsersessionComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
