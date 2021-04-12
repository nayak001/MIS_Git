import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { TeacherbaselineComponent } from './teacherbaseline.component';
import { TeacherBaselineModule } from './teacherbaseline.module';

describe('TeacherbaselineComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TeacherBaselineModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(TeacherbaselineComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
