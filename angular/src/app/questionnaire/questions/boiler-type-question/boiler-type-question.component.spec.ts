import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoilerTypeQuestionComponent } from './boiler-type-question.component';

describe('BoilerTypeQuestionComponent', () => {
  let component: BoilerTypeQuestionComponent;
  let fixture: ComponentFixture<BoilerTypeQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoilerTypeQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoilerTypeQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
