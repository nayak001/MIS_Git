import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { TzworkshoplevelComponent } from './tzworkshoplevel.component';
import { TzworkshoplevelModule } from './tzworkshoplevel.module';

describe('TzworkshoplevelComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TzworkshoplevelModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(TzworkshoplevelComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
