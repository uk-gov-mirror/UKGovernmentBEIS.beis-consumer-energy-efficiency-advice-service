import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerAndErrorContainerComponent } from './spinner-and-error-container.component';

describe('SpinnerAndErrorContainerComponent', () => {
  let component: SpinnerAndErrorContainerComponent;
  let fixture: ComponentFixture<SpinnerAndErrorContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpinnerAndErrorContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerAndErrorContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
