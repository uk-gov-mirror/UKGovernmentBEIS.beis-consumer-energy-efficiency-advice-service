import {ChangeDetectorRef, ComponentFactoryResolver} from "@angular/core";
import {RouterTestingModule} from "@angular/router/testing";
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {By} from "@angular/platform-browser";
import {Observable} from "rxjs/Observable";
import {ActivatedRoute, Router} from "@angular/router";

import {QuestionnaireComponent} from "./questionnaire.component";
import {QuestionnaireService} from "./questionnaire.service";
import {ProgressIndicatorComponent} from "./progress-indicator/progress-indicator.component";
import {QuestionContentService} from "../shared/question-content/question-content.service";
import {AllQuestionsContent} from "../shared/question-content/all-questions-content";
import {QuestionType} from "./question-type";
import {QuestionBaseComponent} from "./base-question/question-base-component";
import {QuestionMetadata} from "./base-question/question-metadata";
import {Questionnaire} from "./base-questionnaire/questionnaire";
import {ResponseData} from "../shared/response-data/response-data";

describe('QuestionnaireComponent', () => {
    let component: QuestionnaireComponent;
    let fixture: ComponentFixture<QuestionnaireComponent>;
    let allQuestionsContent: AllQuestionsContent = {};

    const questionnaireName = 'test';
    const questionId = 'test-question-id';

    let responseDataStub: ResponseData;
    const partialResponse = {postcode: 'w11aa'};

    const questionContentServiceStub = {
        fetchQuestionsContent() {
            return Observable.of(allQuestionsContent);
        }
    };

    class TestQuestionComponent extends QuestionBaseComponent<void> {
        get response(): void {
            return null;
        }

        set response(val: void) {
        }
    }

    class TestQuestion extends QuestionMetadata<void> {
        hasBeenAnswered() {
            return false;
        }
    }

    class TestQuestionnaire extends Questionnaire {
        constructor() {
            super(new ResponseData(), [new TestQuestion(TestQuestionComponent, questionId, QuestionType.User)]);
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

    class MockRouter {
    }

    class MockActivatedRoute {
        private static paramMapGet(key) {
            if (key === 'name') {
                return questionnaireName;
            } else if (key === 'partialResponse') {
                return JSON.stringify(partialResponse);
            } else {
                throw new Error('Unexpected parameter name');
            }
        }

        public snapshot = {
            paramMap: {get: MockActivatedRoute.paramMapGet}
        };

        public paramMap = Observable.of({
            get: MockActivatedRoute.paramMapGet
        });
    }

    beforeEach(async(() => {
        spyOn(questionContentServiceStub, 'fetchQuestionsContent').and.callThrough();
        responseDataStub = new ResponseData();
        TestBed.configureTestingModule({
            declarations: [QuestionnaireComponent, ProgressIndicatorComponent],
            imports: [RouterTestingModule.withRoutes([])],
            providers: [
                ComponentFactoryResolver,
                ChangeDetectorRef,
                {provide: Router, useClass: MockRouter},
                {provide: ActivatedRoute, useClass: MockActivatedRoute},
                {provide: QuestionnaireService, useClass: MockQuestionnaireService},
                {provide: QuestionContentService, useValue: questionContentServiceStub},
                {provide: ResponseData, useValue: responseDataStub}
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

        it('should merge the partial response with the current response data', () => {
            // when
            fixture.detectChanges();

            // then
            expect(responseDataStub).toEqual(jasmine.objectContaining(partialResponse));
        });
    });
});
