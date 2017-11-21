import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoilerOptionCardComponent } from './boiler-option-card.component';

describe('BoilerOptionCardComponent', () => {
  let component: BoilerOptionCardComponent;
  let fixture: ComponentFixture<BoilerOptionCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoilerOptionCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoilerOptionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
