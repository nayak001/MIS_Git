import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { GalleryComponent } from './gallery.component';
import { GalleryModule } from './gallery.module';

describe('GalleryComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ GalleryModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(GalleryComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
