import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { StudentDetailsPageComponent } from './studentDetailsPage.component';
import { StudentDetailsPageModule } from './studentDetailsPage.module';

describe('StudentDetailsPageComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ StudentDetailsPageModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(StudentDetailsPageComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
