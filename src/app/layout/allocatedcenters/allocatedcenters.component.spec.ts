import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AllocatedcentersComponent } from './allocatedcenters.component';
import { AllocatedcentersModule } from './allocatedcenters.module';

describe('AllocatedcentersComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ AllocatedcentersModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(AllocatedcentersComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
