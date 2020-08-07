import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ResponseData} from '../../../shared/response-data/response-data';
import {By} from '@angular/platform-browser';
import {OwnHomeQuestionComponent} from "./own-home-question.component";
import {OwnHome} from "./ownHome";
import {MultipleChoiceQuestionComponent} from "../../common-questions/multiple-choice-question/multiple-choice-question.component";

describe('OwnHomeQuestionComponent', () => {
    let component: OwnHomeQuestionComponent;
    let fixture: ComponentFixture<OwnHomeQuestionComponent>;
    let responseData: ResponseData;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OwnHomeQuestionComponent, MultipleChoiceQuestionComponent],
            providers: [ResponseData]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        responseData = TestBed.get(ResponseData);
        fixture = TestBed.createComponent(OwnHomeQuestionComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should populate with answer in response data', async(() => {
        // given
        responseData.ownsHome = OwnHome.Owner;

        // when
        fixture.detectChanges();

        fixture.whenStable().then(() => {
            const yesOption = fixture.debugElement.query(By.css('#option-0')).nativeElement;
            expect(yesOption.checked).toBeTruthy();
        });
    }));

    it('should set the response', async(() => {
        fixture.detectChanges();

        fixture.whenStable().then(() => {
            const yesOption = fixture.debugElement.query(By.css('#option-0')).nativeElement;
            yesOption.click();

            expect(responseData.ownsHome).toBe(OwnHome.Owner);
        });
    }));
});
