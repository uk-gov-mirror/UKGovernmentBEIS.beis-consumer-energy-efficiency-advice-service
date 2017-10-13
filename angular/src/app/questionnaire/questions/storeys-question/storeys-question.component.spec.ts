import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreysQuestionComponent } from './storeys-question.component';

describe('StoreysQuestionComponent', () => {
  let component: StoreysQuestionComponent;
  let fixture: ComponentFixture<StoreysQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreysQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreysQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
