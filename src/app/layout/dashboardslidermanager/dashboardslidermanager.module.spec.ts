import { DashboardslidermanagerModule } from './dashboardslidermanager.module';

describe('DashboardslidermanagerModule', () => {
  let dashboardslidermanagerModule: DashboardslidermanagerModule;

  beforeEach(() => {
    dashboardslidermanagerModule = new DashboardslidermanagerModule();
  });

  it('should create an instance', () => {
    expect(dashboardslidermanagerModule).toBeTruthy();
  });
});
