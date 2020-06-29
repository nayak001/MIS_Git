import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherprofilecreateComponent } from './teacherprofilecreate.component';

describe('TeacherprofilecreateComponent', () => {
  let component: TeacherprofilecreateComponent;
  let fixture: ComponentFixture<TeacherprofilecreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherprofilecreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherprofilecreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
