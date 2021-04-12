import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { EceactivitiesComponent } from './eceactivities.component';
import { EceactivitiesModule } from './eceactivities.module';

describe('EceactivitiesComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ EceactivitiesModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(EceactivitiesComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
