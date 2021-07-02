import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PostcallactivitiesComponent } from './postcallactivities.component';
import { PostcallactivitiesModule } from './postcallactivities.module';

describe('PostcallactivitiesComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ PostcallactivitiesModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(PostcallactivitiesComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
