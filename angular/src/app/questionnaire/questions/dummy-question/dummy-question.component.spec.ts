import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DummyQuestionComponent } from './dummy-question.component';

describe('DummyQuestionComponent', () => {
  let component: DummyQuestionComponent;
  let fixture: ComponentFixture<DummyQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DummyQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DummyQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
