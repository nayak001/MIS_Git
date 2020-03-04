import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CentersComponent } from './centers.component';
import { CentersModule } from './centers.module';

describe('CentersComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CentersModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(CentersComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
