import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolgeninfoComponent } from './schoolgeninfo.component';

describe('SchoolgeninfoComponent', () => {
  let component: SchoolgeninfoComponent;
  let fixture: ComponentFixture<SchoolgeninfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolgeninfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolgeninfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
