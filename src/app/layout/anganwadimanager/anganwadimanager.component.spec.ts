import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { AnganwadimanagerComponent } from './anganwadimanager.component';
import { AnganwadimanagerModule } from './anganwadimanager.module';

describe('AnganwadimanagerComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ AnganwadimanagerModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(AnganwadimanagerComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
