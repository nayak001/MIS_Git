import { TestBed } from '@angular/core/testing';

import { DashboardslidermanagerService } from './dashboardslidermanager.service';

describe('DashboardslidermanagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DashboardslidermanagerService = TestBed.get(DashboardslidermanagerService);
    expect(service).toBeTruthy();
  });
});
