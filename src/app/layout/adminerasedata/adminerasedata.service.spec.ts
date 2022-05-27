import { TestBed } from "@angular/core/testing";

import { AdminEraseDataService } from "./adminerasedata.service";

describe("AdminEraseDataService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: AdminEraseDataService = TestBed.get(AdminEraseDataService);
    expect(service).toBeTruthy();
  });
});
