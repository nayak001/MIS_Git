import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatensdcmarkComponent } from './updatensdcmark.component';

describe('UpdatensdcmarkComponent', () => {
  let component: UpdatensdcmarkComponent;
  let fixture: ComponentFixture<UpdatensdcmarkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatensdcmarkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatensdcmarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
