import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ManagersboxComponent } from './managersbox.component';
import { ManagersboxModule } from './managersbox.module';

describe('ManagersboxComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ManagersboxModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(ManagersboxComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
