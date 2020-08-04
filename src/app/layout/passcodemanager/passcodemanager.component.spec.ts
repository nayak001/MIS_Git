import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PasscodemanagerComponent } from './passcodemanager.component';
import { PasscodemanagerModule } from './passcodemanager.module';

describe('PasscodemanagerComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ PasscodemanagerModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(PasscodemanagerComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});