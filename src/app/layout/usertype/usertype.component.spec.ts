import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { UsertypeComponent } from './usertype.component';
import { UsertypeModule } from './usertype.module';

describe('UsertypeComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ UsertypeModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(UsertypeComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
