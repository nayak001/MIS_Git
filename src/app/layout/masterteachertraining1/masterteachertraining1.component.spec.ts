import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { Masterteachertraining1Component } from './masterteachertraining1.component';
import { Masterteachertraining1Module } from './masterteachertraining1.module';

describe('Masterteachertraining1Component', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ Masterteachertraining1Module, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(Masterteachertraining1Component);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
