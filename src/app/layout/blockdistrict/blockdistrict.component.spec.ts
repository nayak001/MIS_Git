import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { BlockdistrictComponent } from './blockdistrict.component';
import { BlockdistrictModule } from './blockdistrict.module';

describe('BlockdistrictComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ BlockdistrictModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(BlockdistrictComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
