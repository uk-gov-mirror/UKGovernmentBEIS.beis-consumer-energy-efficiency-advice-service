import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {FormsModule} from '@angular/forms';
import {ResponseData} from '../response-data';
import {ConfirmEpcQuestionComponent} from './confirm-epc-question.component';
import {ConfirmEpcQuestion} from './confirm-epc-question';

describe('ConfirmEpcQuestionComponent', () => {
    let component: ConfirmEpcQuestionComponent;
    let fixture: ComponentFixture<ConfirmEpcQuestionComponent>;
    let responseData: ResponseData;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ConfirmEpcQuestionComponent],
            imports: [FormsModule]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ConfirmEpcQuestionComponent);
        component = fixture.componentInstance;
        responseData = new ResponseData();
        component.question = new ConfirmEpcQuestion(responseData);
        component.notifyOfCompletion = jasmine.createSpy('notifyOfCompletion');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

});