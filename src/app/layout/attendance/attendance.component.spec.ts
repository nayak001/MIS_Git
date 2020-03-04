import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AttendanceComponent } from './attendance.component';
import { AttendanceModule } from './attendance.module';

describe('AttendanceComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ AttendanceModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(AttendanceComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
