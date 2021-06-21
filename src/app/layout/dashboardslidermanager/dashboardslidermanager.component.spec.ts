import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { DashboardslidermanagerComponent } from './dashboardslidermanager.component';
import { DashboardslidermanagerModule } from './dashboardslidermanager.module';

describe('DashboardslidermanagerComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ DashboardslidermanagerModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(DashboardslidermanagerComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
