import { async, TestBed } from "@angular/core/testing";
import { RouterTestingModule } from "@angular/router/testing";

import { AdminEraseDataComponent } from "./adminerasedata.component";
import { AdminerasedataModule } from "./adminerasedata.module";

describe("AdminEraseDataComponent", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AdminerasedataModule, RouterTestingModule],
    }).compileComponents();
  }));

  it("should create", () => {
    const fixture = TestBed.createComponent(AdminEraseDataComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
