import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AssessmentmasterComponent } from './assessmentmaster.component';
import { AssessmentmasterModule } from './assessmentmaster.module';

describe('AssessmentmasterComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ AssessmentmasterModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(AssessmentmasterComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
