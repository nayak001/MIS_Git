import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { TrainingMiscComponent } from './trainingmisc.component';
import { TrainingMiscModule } from './trainingmisc.module';

describe('TrainingMiscComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TrainingMiscModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(TrainingMiscComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});