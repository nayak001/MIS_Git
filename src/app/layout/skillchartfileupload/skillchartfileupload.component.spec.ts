import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { SkillchartfileuploadComponent } from './skillchartfileupload.component';
import { SkillchartfileuploadModule } from './skillchartfileupload.module';

describe('SkillchartfileuploadComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ SkillchartfileuploadModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(SkillchartfileuploadComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
