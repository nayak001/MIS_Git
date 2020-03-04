import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CenterfeedbackComponent } from './centerfeedback.component';
import { CenterfeedbackModule } from './centerfeedback.module';

describe('CenterfeedbackComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CenterfeedbackModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(CenterfeedbackComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
