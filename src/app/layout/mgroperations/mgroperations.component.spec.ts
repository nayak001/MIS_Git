import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MgroperationsComponent } from './mgroperations.component';
import { MgroperationsModule } from './mgroperations.module';

describe('MgroperationsComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MgroperationsModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(MgroperationsComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
