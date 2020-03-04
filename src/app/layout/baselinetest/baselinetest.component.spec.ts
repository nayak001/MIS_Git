import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { BaselinetestComponent } from './baselinetest.component';
import { BaselinetestModule } from './baselinetest.module';

describe('BaselinetestComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ BaselinetestModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(BaselinetestComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
