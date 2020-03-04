import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { UserfeedbackComponent } from './userfeedback.component';
import { UserfeedbackModule } from './userfeedback.module';

describe('UserfeedbackComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ UserfeedbackModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(UserfeedbackComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
