import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupervisorcontrollerComponent } from './supervisorcontroller.component';

describe('SupervisorcontrollerComponent', () => {
  let component: SupervisorcontrollerComponent;
  let fixture: ComponentFixture<SupervisorcontrollerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupervisorcontrollerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupervisorcontrollerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
