import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnganwadicontrollerComponent } from './anganwadicontroller.component';

describe('AnganwadicontrollerComponent', () => {
  let component: AnganwadicontrollerComponent;
  let fixture: ComponentFixture<AnganwadicontrollerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnganwadicontrollerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnganwadicontrollerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
