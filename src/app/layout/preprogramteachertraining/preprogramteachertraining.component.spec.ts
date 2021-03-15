import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PreprogrmateachertrainingComponent } from './preprogramteachertraining.component';
import { PreprgrameTeacherTrainingModule } from './preprogramteachertraining.module';

describe('PreprogrmateachertrainingComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ PreprgrameTeacherTrainingModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(PreprogrmateachertrainingComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
