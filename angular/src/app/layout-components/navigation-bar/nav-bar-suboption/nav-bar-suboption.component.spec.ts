import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarSuboptionComponent } from './nav-bar-suboption.component';

describe('NavBarSuboptionComponent', () => {
  let component: NavBarSuboptionComponent;
  let fixture: ComponentFixture<NavBarSuboptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavBarSuboptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarSuboptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
