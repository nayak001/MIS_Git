import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PptreportComponent } from './pptreport.component';
import { PptreportModule } from './pptreport.module';

describe('PptreportComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ PptreportModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(PptreportComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
