import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {BoilerTypeQuestionComponent} from './boiler-type-question.component';
import {ResponseData} from "../response-data";
import {BoilerTypeQuestion} from "./boiler-type-question";

describe('BoilerTypeQuestionComponent', () => {
    let component: BoilerTypeQuestionComponent;
    let fixture: ComponentFixture<BoilerTypeQuestionComponent>;
    let responseData: ResponseData;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ BoilerTypeQuestionComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BoilerTypeQuestionComponent);
        component = fixture.componentInstance;
        responseData = new ResponseData();
        component.question = new BoilerTypeQuestion(responseData);
        component.notifyOfCompletion = jasmine.createSpy('notifyOfCompletion');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set the response when clicking on one of the buttons', () => {
        // given

        // when
        let yes = fixture.debugElement.query(By.css('#yesButton'));
        yes.nativeElement.click();

        // then
        expect(responseData.condensingBoiler).toBe(true);
    });

    it('should notify of completion when clicking on one of the buttons', () => {
        // given

        // when
        let no = fixture.debugElement.query(By.css('#noButton'));
        no.nativeElement.click();

        // then
        expect(component.notifyOfCompletion).toHaveBeenCalled();
    });
});
