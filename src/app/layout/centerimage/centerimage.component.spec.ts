import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CenterimageComponent } from './centerimage.component';
import { CenterimageModule } from './centerimage.module';

describe('CenterimageComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ CenterimageModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(CenterimageComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
