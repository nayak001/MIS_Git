import { TestBed } from "@angular/core/testing";

import { NsdcService } from "./nsdc.service";

describe("NsdcService", () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it("should be created", () => {
    const service: NsdcService = TestBed.get(NsdcService);
    expect(service).toBeTruthy();
  });
});
