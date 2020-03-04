import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { TzworkshopcontentComponent } from './tzworkshopcontent.component';
import { TzworkshopcontentModule } from './tzworkshopcontent.module';

describe('TzworkshopcontentComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ TzworkshopcontentModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(TzworkshopcontentComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
