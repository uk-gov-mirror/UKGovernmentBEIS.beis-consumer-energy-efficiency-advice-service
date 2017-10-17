import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnaireComponent } from './questionnaire.component';
import {QuestionService} from "./questions/question.service";
import {ProgressIndicatorComponent} from './progress-indicator/progress-indicator.component';

describe('QuestionnaireComponent', () => {
    let component: QuestionnaireComponent;
    let fixture: ComponentFixture<QuestionnaireComponent>;

    class QuestionServiceStub {
        getQuestion(index) {
            return undefined;
        }
        getPreviousQuestionIndex(index) {
            return -1;
        }
        getNextQuestionIndex(index) {
            return -1;
        }
        getQuestions() {
            return [];
        }
        get numberOfQuestions() {
            return 0;
        }
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ QuestionnaireComponent, ProgressIndicatorComponent ],
            providers: [ {provide: QuestionService, useClass: QuestionServiceStub} ],
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(QuestionnaireComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
