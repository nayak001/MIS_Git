import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { VersionmanagerComponent } from './versionmanager.component';
import { VersionmanagerModule } from './versionmanager.module';

describe('VersionmanagerComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ VersionmanagerModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(VersionmanagerComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
