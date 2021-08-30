import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { offlinetrainingComponent } from './offlinetraining.component';
import { Masterteachertraining2Module } from './offlinetraining.module';

describe('offlinetrainingComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ Masterteachertraining2Module, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(offlinetrainingComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
