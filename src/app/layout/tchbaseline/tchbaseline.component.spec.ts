import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { TchbaselineComponent } from './tchbaseline.component';
import { TchbaselineModule } from './tchbaseline.module';

describe('TchbaselineComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TchbaselineModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(TchbaselineComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
