import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { MasterteacherassesmentComponent } from './masterteacherassesment.component';
import { MasterteacherassesmentModule } from './masterteacherassesment.module';

describe('MasterteacherassesmentComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ MasterteacherassesmentModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(MasterteacherassesmentComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
