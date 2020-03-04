import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { IssuesComponent } from './issues.component';
import { IssuesModule } from './issues.module';

describe('IssuesComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ IssuesModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(IssuesComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
