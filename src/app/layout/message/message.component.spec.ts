import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MessageComponent } from './message.component';
import { MessageModule } from './message.module';

describe('MessageComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MessageModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(MessageComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
