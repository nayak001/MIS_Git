import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ManagerDetailsComponent } from './managerDetails.component';
import { ManagerDetailsModule } from './managerDetails.module';

describe('managerDetailsComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ManagerDetailsModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(ManagerDetailsComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
