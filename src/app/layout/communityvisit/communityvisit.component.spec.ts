import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CommunityvisitComponent } from './communityvisit.component';
import { CommunityvisitModule } from './communityvisit.module';

describe('CommunityvisitComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CommunityvisitModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(CommunityvisitComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
