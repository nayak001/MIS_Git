import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AssessmentinfoComponent } from './assessmentinfo.component';
import { AssessmentinfoModule } from './assessmentinfo.module';

describe('AssessmentinfoComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ AssessmentinfoModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(AssessmentinfoComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
