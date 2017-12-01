import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoilerLinkButtonComponent } from './boiler-link-button.component';

describe('BoilerLinkButtonComponent', () => {
  let component: BoilerLinkButtonComponent;
  let fixture: ComponentFixture<BoilerLinkButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoilerLinkButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoilerLinkButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
