import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { TeacherprofileComponent } from './teacherprofile.component';
import { TeacherprofileModule } from './teacherprofile.module';

describe('TeacherprofileComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TeacherprofileModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(TeacherprofileComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
