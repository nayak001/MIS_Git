import { NsdcModule } from "./nsdc.module";

describe("NsdcModule", () => {
  let nsdcModule: NsdcModule;

  beforeEach(() => {
    nsdcModule = new NsdcModule();
  });

  it("should create an instance", () => {
    expect(nsdcModule).toBeTruthy();
  });
});
