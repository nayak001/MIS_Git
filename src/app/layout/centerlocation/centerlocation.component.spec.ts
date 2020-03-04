import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CenterlocationComponent } from './centerlocation.component';
import { CenterlocationModule } from './centerlocation.module';

describe('CenterlocationComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CenterlocationModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(CenterlocationComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
