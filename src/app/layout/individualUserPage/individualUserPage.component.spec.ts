import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { IndividualUserPageComponent } from './individualUserPage.component';
import { IndividualUserPageModule } from './individualUserPage.module';

describe('IndividualUserPageComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ IndividualUserPageModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(IndividualUserPageComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
