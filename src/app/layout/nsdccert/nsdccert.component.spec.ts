import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NsdccertComponent } from './nsdccert.component';

describe('NsdccertComponent', () => {
  let component: NsdccertComponent;
  let fixture: ComponentFixture<NsdccertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NsdccertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NsdccertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
