import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PushnotificationComponent } from './pushnotification.component';
import { PushnotificationModule } from './pushnotification.module';

describe('PushnotificationComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ PushnotificationModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(PushnotificationComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
