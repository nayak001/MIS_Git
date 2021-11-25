import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserswapComponent } from './userswap.component';

describe('UserswapComponent', () => {
  let component: UserswapComponent;
  let fixture: ComponentFixture<UserswapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserswapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserswapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
