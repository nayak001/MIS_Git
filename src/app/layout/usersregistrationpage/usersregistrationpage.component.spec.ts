import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { UsersregistrationpageComponent } from './usersregistrationpage.component';
import { UsersregistrationpageModule } from './usersregistrationpage.module';

describe('UsersregistrationpageComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ UsersregistrationpageModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(UsersregistrationpageComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
