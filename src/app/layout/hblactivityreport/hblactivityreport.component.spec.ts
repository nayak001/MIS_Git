import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HblactivityreportComponent } from './hblactivityreport.component';
import { HblactivityreportModule } from './hblactivityreport.module';

describe('HblactivityreportComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HblactivityreportModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(HblactivityreportComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
