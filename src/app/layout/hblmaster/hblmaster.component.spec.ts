import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HblmasterComponent } from './hblmaster.component';
import { HblmasterModule } from './hblmaster.module';

describe('HblmasterComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ HblmasterModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(HblmasterComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
