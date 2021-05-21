import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PgskillmasterComponent } from './pgeskillmaster.component';
import { PgeskillmasterRoutingModule } from './pgeskillmaster-routing.module';

describe('PgskillmasterComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ PgeskillmasterRoutingModule, RouterTestingModule ],
    })
    .compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(PgskillmasterComponent);
    const component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });
});
