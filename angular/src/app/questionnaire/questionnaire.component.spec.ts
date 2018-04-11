import {ChangeDetectorRef, ComponentFactoryResolver} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute} from '@angular/router';

import {QuestionnaireComponent} from './questionnaire.component';
import {QuestionnaireService} from './questionnaire.service';
import {ProgressIndicatorComponent} from './progress-indicator/progress-indicator.component';
import {StickyRowWrapperComponent} from "../shared/sticky-row-wrapper/sticky-row-wrapper.component";
import {QuestionContentService} from '../shared/question-content/question-content.service';
import {AllQuestionsContent} from '../shared/question-content/all-questions-content';
import {QuestionType} from './questions/question-type';
import {QuestionBaseComponent} from './base-question/question-base-component';
import {QuestionMetadata} from './base-question/question-metadata';
import {Questionnaire} from './base-questionnaire/questionnaire';
import {ResponseData} from '../shared/response-data/response-data';
import {SpinnerAndErrorContainerComponent} from '../shared/spinner-and-error-container/spinner-and-error-container.component';
import {QuestionHeadingProcessor} from './question-heading-processor.service';
import {GoogleAnalyticsService} from '../shared/analytics/google-analytics.service';
import {QuestionReasonComponent} from '../shared/question-reason/question-reason.component';

import {InlineSVGModule} from 'ng-inline-svg';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {UserStateService} from "../shared/user-state-service/user-state-service";

describe('QuestionnaireComponent', () => {
    let component: QuestionnaireComponent;
    let fixture: ComponentFixture<QuestionnaireComponent>;
    let allQuestionsContent: AllQuestionsContent = {};
    let startingQuestion;

    const questionnaireName = 'test';
    const questionId = 'test-question-id';
    const anotherQuestionId = 'another-test-question-id';

    let responseDataStub: ResponseData;

    const questionContentServiceStub = {
        fetchQuestionsContent() {
            return Observable.of(allQuestionsContent);
        }
    };

    const userStateServiceStub = {
        sendState: () => {}
    };

    class TestQuestionComponent extends QuestionBaseComponent {
        responseForAnalytics: string;

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
        constructor() {
            super(
                new ResponseData(),
                [
                    new TestQuestion(TestQuestionComponent, questionId, QuestionType.House),
                    new TestQuestion(TestQuestionComponent, anotherQuestionId, QuestionType.House)
                ]
            );
        }
    }

    class MockQuestionnaireService {
        getQuestionnaireWithName(name) {
            if (name === questionnaireName) {
                return new TestQuestionnaire();
            } else {
                throw new Error('Unexpected questionnaire name');
            }
        }
    }

    class MockQuestionHeadingProcessor {
        replacePlaceholders(questionHeading) {
            return questionHeading;
        }
    }

    class MockActivatedRoute {

        public snapshot = {
            paramMap: {get: MockActivatedRoute.paramMapGet},
            queryParamMap: {get: MockActivatedRoute.queryParamMapGet}
        };

        public paramMap = Observable.of({
            get: MockActivatedRoute.paramMapGet
        });

        public queryParamMap = Observable.of({
            get: MockActivatedRoute.queryParamMapGet
        });

        private static queryParamMapGet(key) {
            if (key === 'startingQuestion') {
                return startingQuestion;
            } else {
                throw new Error('Unexpected query parameter name');
            }
        }

        private static paramMapGet(key) {
            if (key === 'name') {
                return questionnaireName;
            } else {
                throw new Error('Unexpected parameter name');
            }
        }
    }

    beforeEach(async(() => {
        spyOn(questionContentServiceStub, 'fetchQuestionsContent').and.callThrough();
        responseDataStub = new ResponseData();
        TestBed.configureTestingModule({
            declarations: [
                QuestionnaireComponent,
                ProgressIndicatorComponent,
                StickyRowWrapperComponent,
                ProgressIndicatorComponent,
                SpinnerAndErrorContainerComponent,
                QuestionReasonComponent
            ],
            imports: [RouterTestingModule.withRoutes([]), InlineSVGModule, HttpClientTestingModule],
            providers: [
                ComponentFactoryResolver,
                ChangeDetectorRef,
                GoogleAnalyticsService,
                {provide: ActivatedRoute, useClass: MockActivatedRoute},
                {provide: QuestionnaireService, useClass: MockQuestionnaireService},
                {provide: QuestionHeadingProcessor, useClass: MockQuestionHeadingProcessor},
                {provide: QuestionContentService, useValue: questionContentServiceStub},
                {provide: UserStateService, useValue: userStateServiceStub},
                {provide: ResponseData, useValue: responseDataStub},
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        startingQuestion = null;
        fixture = TestBed.createComponent(QuestionnaireComponent);
        component = fixture.componentInstance;
        component.questionnaireName = questionnaireName;
        spyOn(component.onQuestionnaireComplete, 'emit');
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
                    helpHtml: 'some help text',
                    questionReason: 'this question helps us show you useful results'
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
            const expectedHelpHtml = 'test question help text';
            allQuestionsContent = {
                [questionId]: {
                    questionHeading: 'test question heading',
                    helpHtml: expectedHelpHtml,
                    questionReason: 'this question helps us show you useful results'
                }
            };
            component.currentQuestionIndex = 0;

            // when
            fixture.detectChanges();

            // then
            fixture.whenStable().then(() => {
                const helpTextElement = fixture.debugElement.query(By.css('.help-text'));
                expect(helpTextElement.nativeElement.innerText).toBe(expectedHelpHtml);
            });
        }));

        it('should initialise with the question reason hidden', async(() => {
            // given
            allQuestionsContent = {
                [questionId]: {
                    questionHeading: 'test question heading',
                    helpHtml: '',
                    questionReason: 'this question helps us show you useful results',
                    autoOpenQuestionReason: false
                }
            };
            component.currentQuestionIndex = 0;

            // when
            fixture.detectChanges();

            // then
            fixture.whenStable().then(() => {
                const questionReasonElement = fixture.debugElement.query(By.css('.question-reason'));
                expect(questionReasonElement.classes.visible).toBeFalsy();
            });
        }));
    });

    describe('#goForwards', () => {
        it('should not emit completion event if there is another question', () => {
            // given
            allQuestionsContent = {
                [questionId]: {questionHeading: 'test question heading', helpHtml: '', questionReason: ''},
                [anotherQuestionId]: {questionHeading: 'test question heading', helpHtml: '', questionReason: ''}
            };
            component.currentQuestionIndex = 0;
            fixture.detectChanges();

            // when
            component.goForwards();

            // then
            expect(component.onQuestionnaireComplete.emit).not.toHaveBeenCalled();
        });

        it('should emit completion event if on the last question', () => {
            // given
            allQuestionsContent = {
                [questionId]: {questionHeading: 'test question heading', helpHtml: '', questionReason: ''},
                [anotherQuestionId]: {questionHeading: 'test question heading', helpHtml: '', questionReason: ''}
            };
            component.currentQuestionIndex = 1;
            fixture.detectChanges();

            // when
            component.goForwards();

            // then
            expect(component.onQuestionnaireComplete.emit).toHaveBeenCalled();
        });
    });
});
