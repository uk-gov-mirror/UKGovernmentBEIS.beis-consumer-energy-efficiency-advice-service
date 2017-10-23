import {ChangeDetectorRef, ComponentFactoryResolver} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {Observable} from 'rxjs/Observable';

import {QuestionnaireComponent} from './questionnaire.component';
import {QuestionnaireService} from './questions/questionnaire.service';
import {ProgressIndicatorComponent} from './progress-indicator/progress-indicator.component';
import {QuestionContentService} from '../common/question-content/question-content.service';
import {AllQuestionsContent} from '../common/question-content/all-questions-content';
import {QuestionType} from './question-type';
import {PostcodeEpcComponent} from '../postcode-epc/postcode-epc.component';

describe('QuestionnaireComponent', () => {
    let component: QuestionnaireComponent;
    let fixture: ComponentFixture<QuestionnaireComponent>;
    let allQuestionsContent: AllQuestionsContent = {};

    const questionId = 'test-question-id';
    const questions = [
        {
            componentType: PostcodeEpcComponent,
            questionId: questionId,
            questionType: QuestionType.User
        }
    ];

    const questionContentServiceStub = {
        fetchQuestionsContent() {
            return Observable.of(allQuestionsContent);
        }
    };

    class QuestionnaireServiceStub {
        getQuestion(index) {
            return questions[index];
        }
        isAvailable(index) {
            return true;
        }
        isApplicable(index) {
            return true;
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
            return questions;
        }
    }

    beforeEach(async(() => {
        spyOn(questionContentServiceStub, 'fetchQuestionsContent').and.callThrough();

        TestBed.configureTestingModule({
            declarations: [ QuestionnaireComponent, ProgressIndicatorComponent ],
            providers: [
                ComponentFactoryResolver,
                ChangeDetectorRef,
                {provide: QuestionnaireService, useClass: QuestionnaireServiceStub},
                {provide: QuestionContentService, useValue: questionContentServiceStub}
            ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(QuestionnaireComponent);
        component = fixture.componentInstance;
    });

    describe('#construct', () => {
        it('should create', () => {
            expect(component).toBeTruthy();
        });

        it('should fetch content for all questions', () => {
            // when
            fixture.detectChanges();

            // then
            expect(questionContentServiceStub.fetchQuestionsContent).toHaveBeenCalled();
        });

        it('should display the question heading correctly', async(() => {
            // given
            const expectedQuestionHeading = 'test question heading';
            allQuestionsContent = {
                [questionId]: {
                    questionHeading: expectedQuestionHeading,
                    helpText: 'some help text'
                }
            };
            component.currentQuestionIndex = 0;

            // when
            fixture.detectChanges();

            // then
            fixture.whenStable().then(() => {
                const questionHeadingElement = fixture.debugElement.query(By.css('.question-heading'));
                expect(questionHeadingElement.nativeElement.innerText).toBe(expectedQuestionHeading);
            });
        }));

        it('should display the question help text correctly', async(() => {
            // given
            const expectedHelpText = 'test question help text';
            allQuestionsContent = {
                [questionId]: {
                    questionHeading: 'test question heading',
                    helpText: expectedHelpText
                }
            };
            component.currentQuestionIndex = 0;

            // when
            fixture.detectChanges();

            // then
            fixture.whenStable().then(() => {
                const helpTextElement = fixture.debugElement.query(By.css('.help-text'));
                expect(helpTextElement.nativeElement.innerText).toBe(expectedHelpText);
            });
        }));
    });
});
