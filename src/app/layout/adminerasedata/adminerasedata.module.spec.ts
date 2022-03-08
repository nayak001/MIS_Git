import { AdminerasedataModule } from "./adminerasedata.module";

describe("AdminerasedataModule", () => {
  let adminerasedataModule: AdminerasedataModule;

  beforeEach(() => {
    adminerasedataModule = new AdminerasedataModule();
  });

  it("should create an instance", () => {
    expect(adminerasedataModule).toBeTruthy();
  });
});
