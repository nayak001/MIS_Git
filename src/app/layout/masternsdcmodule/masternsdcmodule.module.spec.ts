import { MasterNsdcModule } from "./masternsdcmodule.module";

describe("MasterNsdcModule", () => {
  let masterteachertraining2Module: MasterNsdcModule;

  beforeEach(() => {
    masterteachertraining2Module = new MasterNsdcModule();
  });

  it("should create an instance", () => {
    expect(masterteachertraining2Module).toBeTruthy();
  });
});
