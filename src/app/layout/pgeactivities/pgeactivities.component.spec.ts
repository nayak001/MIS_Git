import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PgeactivitiesComponent } from './pgeactivities.component';
import { PgeactivitiesModule } from './pgeactivities.module';

describe('PgeactivitiesComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ PgeactivitiesModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(PgeactivitiesComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
