import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BedroomsQuestionComponent } from './bedrooms-question.component';
import {NumberQuestionComponent} from "../../common/number-question/number-question.component";

describe('BedroomsQuestionComponent', () => {
  let component: BedroomsQuestionComponent;
  let fixture: ComponentFixture<BedroomsQuestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BedroomsQuestionComponent, NumberQuestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BedroomsQuestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
