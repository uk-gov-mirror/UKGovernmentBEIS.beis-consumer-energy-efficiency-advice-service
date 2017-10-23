import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrantCardComponent } from './grant-card.component';

describe('GrantCardComponent', () => {
  let component: GrantCardComponent;
  let fixture: ComponentFixture<GrantCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrantCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrantCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
