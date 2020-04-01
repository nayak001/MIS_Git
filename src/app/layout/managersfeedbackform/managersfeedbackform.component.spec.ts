import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ManagersfeedbackformComponent } from './managersfeedbackform.component';
import { ManagersfeedbackformModule } from './managersfeedbackform.module';

describe('ManagersfeedbackformComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ManagersfeedbackformModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(ManagersfeedbackformComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
