import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { TchassessmentComponent } from './tchassessment.component';
import { TchassessmentModule } from './tchassessment.module';

describe('TchassessmentComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TchassessmentModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(TchassessmentComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
