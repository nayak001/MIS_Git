import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeapgrouptaskComponent } from './leapgrouptask.component';

describe('LeapgrouptaskComponent', () => {
  let component: LeapgrouptaskComponent;
  let fixture: ComponentFixture<LeapgrouptaskComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeapgrouptaskComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeapgrouptaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
