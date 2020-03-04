import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeapgeneralinfoComponent } from './leapgeneralinfo.component';

describe('LeapgeneralinfoComponent', () => {
  let component: LeapgeneralinfoComponent;
  let fixture: ComponentFixture<LeapgeneralinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeapgeneralinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeapgeneralinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
