import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { Mastermanagertraining1Component } from './mastermanagertraining1.component';
import { Mastermanagertraining1Module } from './mastermanagertraining1.module';

describe('Mastermanagertraining1Component', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ Mastermanagertraining1Module, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(Mastermanagertraining1Component);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
