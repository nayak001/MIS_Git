import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { Mastermanagertraining2Component } from './mastermanagertraining2.component';
import { Mastermanagertraining2Module } from './mastermanagertraining2.module';

describe('Mastermanagertraining2Component', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ Mastermanagertraining2Module, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(Mastermanagertraining2Component);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
