import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlatPositionQuestionComponent } from './flat-position-question.component';

describe('FlatPositionQuestionComponent', () => {
  let component: FlatPositionQuestionComponent;
  let fixture: ComponentFixture<FlatPositionQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlatPositionQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlatPositionQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
