import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnaireComponent } from './questionnaire.component';
import {QuestionService} from "./questions/question.service";

describe('QuestionnaireComponent', () => {
    let component: QuestionnaireComponent;
    let fixture: ComponentFixture<QuestionnaireComponent>;

    class QuestionServiceStub {
        getFirstUnansweredQuestionIndex() {
            return 0;
        }
        getQuestionByIndex(index) {
            return undefined;
        }
        questionHasBeenAnswered(index) {
            return false;
        }
        isFinalQuestion(index) {
            return true;
        }
        getHeading(index) {
            return 'question';
        }
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ QuestionnaireComponent ],
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
