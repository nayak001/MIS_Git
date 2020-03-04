import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CentersAllocationComponent } from './centers-allocation.component';
import { CentersAllocationModule } from './centers-allocation.module';

describe('CentersAllocationComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CentersAllocationModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(CentersAllocationComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
