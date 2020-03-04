import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { DailyinfoComponent } from './dailyinfo.component';
import { DailyinfoModule } from './dailyinfo.module';

describe('DailyinfoComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ DailyinfoModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(DailyinfoComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
