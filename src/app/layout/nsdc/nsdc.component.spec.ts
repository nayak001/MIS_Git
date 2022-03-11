import { async, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { NsdcComponent } from "./nsdc.component";
import { TeacherBaselineModule } from "./nsdc.module";

describe("NsdcComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TeacherBaselineModule, RouterTestingModule],
    }).compileComponents();
  }));

  it("should create", () => {
    const fixture = TestBed.createComponent(NsdcComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
