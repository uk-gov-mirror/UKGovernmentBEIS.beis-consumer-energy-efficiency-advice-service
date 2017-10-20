import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import {ProgressIndicatorComponent} from './progress-indicator.component';
import {QuestionnaireService} from '../questions/questionnaire.service';
import {QuestionType, QuestionTypeUtil} from '../question-type';
import {DebugElement} from "@angular/core/core";

describe('ProgressIndicatorComponent', () => {
    let component: ProgressIndicatorComponent;
    let fixture: ComponentFixture<ProgressIndicatorComponent>;
    let availableQuestions: number[];

    class QuestionnaireServiceStub {
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
            return QuestionnaireServiceStub.questions[index];
        }
        isAvailable(index) {
            return availableQuestions !== undefined && availableQuestions.includes(index);
        }
        hasBeenAnswered(index) {
            return false;
        }
        getPreviousQuestionIndex(index) {
            return -1;
        }
        getNextQuestionIndex(index) {
            return -1;
        }
        getQuestions() {
            return QuestionnaireServiceStub.questions;
        }
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ ProgressIndicatorComponent ],
            providers: [ {provide: QuestionnaireService, useClass: QuestionnaireServiceStub } ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ProgressIndicatorComponent);
        component = fixture.componentInstance;
        spyOn(component.clickedOnLink, 'emit');
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

    it('should display the correct number of sections', () => {
        // given
        // Typescript implements an enum as an object which has each member as a property twice (as 'index: value'
        // and 'value: index') so we need to divide the keyset by 2 to get the number of members of the enum
        const expectedNumberOfQuestionnaireSections = Object.keys(QuestionType).length / 2;

        // when
        const allQuestionnaireSections = fixture.debugElement.queryAll(By.css('.questionnaire-section'));

        // then
        expect(allQuestionnaireSections.length).toEqual(expectedNumberOfQuestionnaireSections);
    });

    it('should display the correct number of questions in each section', () => {
        // given
        const expectedNumberOfHeatingQuestions = QuestionnaireServiceStub.questions
            .filter(q => q.questionType === QuestionType.Heating)
            .length;
        const allQuestionnaireSections = fixture.debugElement.queryAll(By.css('.questionnaire-section'));

        // when
        const heatingSection = allQuestionnaireSections.find(section => {
            const sectionIcon = section.query(By.css('.question-type-icon'));
            const heatingIconClassName = QuestionTypeUtil.getIconClassName(QuestionType.Heating);
            return sectionIcon.nativeElement.classList.contains(heatingIconClassName);
        });

        // then
        const allHeatingQuestions = heatingSection.queryAll(By.css('.progress-indicator-step'));
        expect(allHeatingQuestions.length).toEqual(expectedNumberOfHeatingQuestions);
    });

    it('should display the correct total number of questions', () => {
        // given
        const allQuestions = fixture.debugElement.queryAll(By.css('.progress-indicator-step'));

        // then
        expect(allQuestions.length).toEqual(QuestionnaireServiceStub.questions.length);
    });

    it('should not allow the button for an unavailable question link to be clicked', () => {
        // given
        availableQuestions = [1];
        const allProgressIndicatorSteps = fixture.debugElement.queryAll(By.css('.progress-indicator-step'));

        // when
        const progressIndicatorStep = allProgressIndicatorSteps[0];
        fixture.detectChanges();

        // then
        expect(isDisabled(progressIndicatorStep)).toBeTruthy();

    });

    it('should allow the button for an available question link to be clicked', () => {
        // given
        availableQuestions = [1];
        const allProgressIndicatorSteps = fixture.debugElement.queryAll(By.css('.progress-indicator-step'));

        // when
        const progressIndicatorStep = allProgressIndicatorSteps[1];
        fixture.detectChanges();

        // then
        expect(isDisabled(progressIndicatorStep)).toBeFalsy();

    });

    it('should emit an event when an available question link is clicked', () => {
        // given
        availableQuestions = [1];
        const allProgressIndicatorSteps = fixture.debugElement.queryAll(By.css('.progress-indicator-step'));

        // when
        const progressIndicatorStep = allProgressIndicatorSteps[1];
        getStepLink(progressIndicatorStep).nativeElement.click();
        fixture.detectChanges();

        // then
        expect(component.clickedOnLink.emit).toHaveBeenCalledWith(1);
    });

    function getStepLink(progressIndicatorStep: DebugElement): DebugElement {
        return progressIndicatorStep.children.find(el => el.nativeElement.classList.contains('step-link'));
    }

    function isActive(progressIndicatorStep: DebugElement): boolean {
        const stepDisplay = getStepLink(progressIndicatorStep);
        return stepDisplay.nativeElement.classList.contains('active');
    }

    function isDisabled(progressIndicatorStep: DebugElement): boolean {
        const stepDisplay = getStepLink(progressIndicatorStep);
        return stepDisplay.nativeElement.getAttribute('disabled') !== null;
    }
});