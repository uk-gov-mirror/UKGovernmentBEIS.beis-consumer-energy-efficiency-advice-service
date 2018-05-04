import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {ProgressIndicatorComponent} from './progress-indicator.component';
import {QuestionType, QuestionTypeUtil} from '../questions/question-type';
import {DebugElement} from '@angular/core/core';
import {AllQuestionsContent} from '../../shared/question-content/all-questions-content';
import {Questionnaire} from '../base-questionnaire/questionnaire';
import {ResponseData} from '../../shared/response-data/response-data';
import {QuestionMetadata} from '../base-question/question-metadata';
import {QuestionBaseComponent} from '../base-question/question-base-component';
import groupBy from 'lodash-es/groupBy';
import {InlineSVGModule} from 'ng-inline-svg';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import includes from 'lodash-es/includes';

describe('ProgressIndicatorComponent', () => {
    let component: ProgressIndicatorComponent;
    let fixture: ComponentFixture<ProgressIndicatorComponent>;

    class TestQuestionComponent extends QuestionBaseComponent {
        get responseForAnalytics(): string {
            return undefined;
        }

        get response(): void {
            return null;
        }

        set response(val: void) {
        }
    }

    class TestQuestion extends QuestionMetadata {
        hasBeenAnswered() {
            return false;
        }
    }

    class TestQuestionnaire extends Questionnaire {
        static readonly questions = [
            new TestQuestion(TestQuestionComponent, 'question0', QuestionType.House),
            new TestQuestion(TestQuestionComponent, 'question1', QuestionType.House),
            new TestQuestion(TestQuestionComponent, 'question2', QuestionType.House),
            new TestQuestion(TestQuestionComponent, 'question3', QuestionType.House),
            new TestQuestion(TestQuestionComponent, 'question4', QuestionType.House),
            new TestQuestion(TestQuestionComponent, 'question5', QuestionType.Heating),
            new TestQuestion(TestQuestionComponent, 'question6', QuestionType.Heating),
            new TestQuestion(TestQuestionComponent, 'question7', QuestionType.Heating),
            new TestQuestion(TestQuestionComponent, 'question8', QuestionType.Heating),
            new TestQuestion(TestQuestionComponent, 'question9', QuestionType.Heating)
        ];

        constructor() {
            super(new ResponseData(), TestQuestionnaire.questions);
        }
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProgressIndicatorComponent],
            imports: [InlineSVGModule, HttpClientTestingModule],
            providers: [ResponseData]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProgressIndicatorComponent);
        component = fixture.componentInstance;
        component.questionnaire = new TestQuestionnaire();
        component.shouldShowIndicator = true;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should display the correct percentage completed', () => {
        // given
        component.currentQuestionIndex = 3;
        const completionPercentage = fixture.debugElement.query(By.css('.completion-percentage'));

        // then
        expect(completionPercentage.nativeElement.innerText).toEqual(component.currentPercentage + "% Completed");
    });
});
