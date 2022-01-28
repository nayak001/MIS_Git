import { async, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { MasterNsdcComponent } from "./masternsdcmodule.component";
import { MasterNsdcModule } from "./masternsdcmodule.module";

describe("NsdcExamComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MasterNsdcModule, RouterTestingModule],
    }).compileComponents();
  }));

  it("should create", () => {
    const fixture = TestBed.createComponent(MasterNsdcComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
