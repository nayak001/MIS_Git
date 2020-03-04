import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolgrouptaskComponent } from './schoolgrouptask.component';

describe('SchoolgrouptaskComponent', () => {
  let component: SchoolgrouptaskComponent;
  let fixture: ComponentFixture<SchoolgrouptaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolgrouptaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolgrouptaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
