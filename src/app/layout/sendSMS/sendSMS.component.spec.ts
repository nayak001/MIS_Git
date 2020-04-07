import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SendSMSComponent } from './sendSMS.component';
import { SendSMSModule } from './sendSMS.module';

describe('SendSMSComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ SendSMSModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(SendSMSComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
