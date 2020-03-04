import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ActivitiesComponent } from './activities.component';
import { ActivitiesModule } from './activities.module';

describe('ActivitiesComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ActivitiesModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(ActivitiesComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
