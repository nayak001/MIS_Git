import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { Masterteachertraining2Component } from './masterteachertraining2.component';
import { Masterteachertraining2Module } from './masterteachertraining2.module';

describe('Masterteachertraining2Component', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ Masterteachertraining2Module, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(Masterteachertraining2Component);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
