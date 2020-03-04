import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CenterDetailsComponent } from './centerDetails.component';
import { CenterDetailsModule } from './centerDetails.module';

describe('CenterDetailsComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CenterDetailsModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(CenterDetailsComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
