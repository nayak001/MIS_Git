import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolindpracticeComponent } from './schoolindpractice.component';

describe('SchoolindpracticeComponent', () => {
  let component: SchoolindpracticeComponent;
  let fixture: ComponentFixture<SchoolindpracticeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolindpracticeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolindpracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
