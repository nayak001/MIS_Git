import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { StudentdetailsComponent } from './studentdetails.component';
import { StudentdetailsModule } from './studentdetails.module';

describe('StudentdetailsComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ StudentdetailsModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(StudentdetailsComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
