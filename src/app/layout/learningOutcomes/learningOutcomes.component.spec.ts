import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LearningOutcomesComponent } from './learningOutcomes.component';
import { LearningOutcomesModule } from './learningOutcomes.module';

describe('IndividualUserPageComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ LearningOutcomesModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(LearningOutcomesComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
