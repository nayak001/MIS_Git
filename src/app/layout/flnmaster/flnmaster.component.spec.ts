import { async, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { FlnMasterComponent } from "./flnmaster.component";
import { FlnmasterModule } from "./flnmaster.module";

describe("TeacherbaselineComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FlnmasterModule, RouterTestingModule],
    }).compileComponents();
  }));

  it("should create", () => {
    const fixture = TestBed.createComponent(FlnMasterComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
