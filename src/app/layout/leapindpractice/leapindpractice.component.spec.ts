import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeapindpracticeComponent } from './leapindpractice.component';

describe('LeapindpracticeComponent', () => {
  let component: LeapindpracticeComponent;
  let fixture: ComponentFixture<LeapindpracticeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeapindpracticeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeapindpracticeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
