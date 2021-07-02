import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { UdisemanagerComponent } from './udisemanager.component';
import { UdisemanagerModule } from './udisemanager.module';

describe('UdisemanagerComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ UdisemanagerModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(UdisemanagerComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
