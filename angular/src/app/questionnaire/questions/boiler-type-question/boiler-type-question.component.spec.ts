import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {BoilerTypeQuestionComponent} from './boiler-type-question.component';
import {ResponseData} from "../../response-data/response-data";

describe('BoilerTypeQuestionComponent', () => {
    let component: BoilerTypeQuestionComponent;
    let fixture: ComponentFixture<BoilerTypeQuestionComponent>;

    const responseData: ResponseData = new ResponseData();

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ BoilerTypeQuestionComponent ],
            providers: [{provide: ResponseData, useValue: responseData}]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BoilerTypeQuestionComponent);
        component = fixture.componentInstance;
        component.notifyOfCompletion = jasmine.createSpy('notifyOfCompletion');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set the response when clicking on one of the buttons', () => {
        // given

        // when
        let yes = fixture.debugElement.query(By.css('#yes-button'));
        yes.nativeElement.click();

        // then
        expect(responseData.condensingBoiler).toBe(true);
    });

    it('should notify of completion when clicking on one of the buttons', () => {
        // given

        // when
        let no = fixture.debugElement.query(By.css('#no-button'));
        no.nativeElement.click();

        // then
        expect(component.notifyOfCompletion).toHaveBeenCalled();
    });
});
