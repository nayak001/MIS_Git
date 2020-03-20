import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { UsersregistrationComponent } from './usersregistration.component';
import { UsersregistrationModule } from './usersregistration.module';

describe('UsersregistrationComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ UsersregistrationModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(UsersregistrationComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
