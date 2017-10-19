import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnaireComponent } from './questionnaire.component';
import {QuestionnaireService} from "./questions/questionnaire.service";
import {ProgressIndicatorComponent} from './progress-indicator/progress-indicator.component';

describe('QuestionnaireComponent', () => {
    let component: QuestionnaireComponent;
    let fixture: ComponentFixture<QuestionnaireComponent>;

    class QuestionnaireServiceStub {
        getQuestion(index) {
            return undefined;
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
            return [];
        }
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ QuestionnaireComponent, ProgressIndicatorComponent ],
            providers: [ {provide: QuestionnaireService, useClass: QuestionnaireServiceStub} ],
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
