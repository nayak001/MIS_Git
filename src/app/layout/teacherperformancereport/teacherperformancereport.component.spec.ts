import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { IndividualTeachersEducatorPageComponent } from './individualTeachersEducatorPage.component';
import { IndividualTeachersEducatorPageModule } from './individualTeachersEducatorPage.module';

describe('IndividualTeachersEducatorPageComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ IndividualTeachersEducatorPageModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(IndividualTeachersEducatorPageComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
