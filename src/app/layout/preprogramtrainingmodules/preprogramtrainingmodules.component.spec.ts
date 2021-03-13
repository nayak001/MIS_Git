import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PreprogramTrainingComponent } from './preprogramtrainingmodules.component';
import { PreprogramtrainingModule } from './preprogramtrainingmodules.module';

describe('PreprogramTrainingComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ PreprogramtrainingModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(PreprogramTrainingComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
