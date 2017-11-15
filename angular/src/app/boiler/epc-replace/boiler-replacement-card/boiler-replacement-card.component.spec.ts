import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoilerReplacementCardComponent } from './boiler-replacement-card.component';

describe('BoilerReplacementCardComponent', () => {
  let component: BoilerReplacementCardComponent;
  let fixture: ComponentFixture<BoilerReplacementCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoilerReplacementCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoilerReplacementCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
