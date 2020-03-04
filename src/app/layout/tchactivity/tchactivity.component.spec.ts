import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { TchactivityComponent } from './tchactivity.component';
import { TchactivityModule } from './tchactivity.module';

describe('TchactivityComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TchactivityModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(TchactivityComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
