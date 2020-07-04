import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SurveymasterComponent } from './surveymaster.component';
import { SurveymasterModule } from './surveymaster.module';

describe('SurveymasterComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ SurveymasterModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(SurveymasterComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
