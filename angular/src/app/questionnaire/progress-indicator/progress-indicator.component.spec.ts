import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {ProgressIndicatorComponent} from './progress-indicator.component';
import {QuestionService} from '../questions/question.service';
import {QuestionType} from '../question-type';
import {DebugElement} from "@angular/core/core";

describe('ProgressIndicatorComponent', () => {
    let component: ProgressIndicatorComponent;
    let fixture: ComponentFixture<ProgressIndicatorComponent>;

    class QuestionServiceStub {
        static readonly questions = [
            {questionType: QuestionType.User},
            {questionType: QuestionType.User},
            {questionType: QuestionType.House},
            {questionType: QuestionType.House},
            {questionType: QuestionType.House},
            {questionType: QuestionType.Heating},
            {questionType: QuestionType.Heating},
            {questionType: QuestionType.Heating},
            {questionType: QuestionType.Heating},
            {questionType: QuestionType.Heating}
        ];
        getQuestion(index) {
            return QuestionServiceStub.questions[index];
        }
        getPreviousQuestionIndex(index) {
            return -1;
        }
        getNextQuestionIndex(index) {
            return -1;
        }
        getHeading(index) {
            return 'question';
        }
        getQuestionType(index) {
            return QuestionServiceStub.questions[index].questionType;
        }
        get numberOfQuestions() {
            return QuestionServiceStub.questions.length;
        }
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ProgressIndicatorComponent ],
            providers: [ {provide: QuestionService, useClass: QuestionServiceStub } ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProgressIndicatorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should display the current question as active', () => {
        // given
        const currentQuestionIndex = 3;
        const allProgressIndicatorSteps = fixture.debugElement.queryAll(By.css('.progress-indicator-step'));

        // when
        component.currentQuestionIndex = currentQuestionIndex;
        const currentProgressIndicatorStep = allProgressIndicatorSteps[currentQuestionIndex];
        fixture.detectChanges();

        // then
        expect(isActive(currentProgressIndicatorStep)).toBeTruthy();
    });

    it('should display non-current questions as inactive', () => {
        // given
        const currentQuestionIndex = 3;
        const allProgressIndicatorSteps = fixture.debugElement.queryAll(By.css('.progress-indicator-step'));

        // when
        component.currentQuestionIndex = currentQuestionIndex;
        const nonCurrentProgressIndicatorSteps = allProgressIndicatorSteps.filter(step => allProgressIndicatorSteps.indexOf(step) !== currentQuestionIndex);
        fixture.detectChanges();

        // then
        nonCurrentProgressIndicatorSteps.forEach((progressIndicatorStep) => expect(isActive(progressIndicatorStep)).toBeFalsy());
    });

    function isActive(progressIndicatorStep: DebugElement): boolean {
        const stepDisplay = progressIndicatorStep.children.find(el => el.nativeElement.classList.contains('step-link'));
        return stepDisplay.nativeElement.classList.contains('active');
    }
});