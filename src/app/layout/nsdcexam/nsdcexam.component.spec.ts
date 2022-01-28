import { async, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { NsdcExamComponent } from "./nsdcexam.component";
import { TeacherBaselineModule } from "./nsdcexam.module";

describe("NsdcExamComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [TeacherBaselineModule, RouterTestingModule],
    }).compileComponents();
  }));

  it("should create", () => {
    const fixture = TestBed.createComponent(NsdcExamComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
