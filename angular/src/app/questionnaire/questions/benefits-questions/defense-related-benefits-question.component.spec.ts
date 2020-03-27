import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ResponseData} from '../../../shared/response-data/response-data';
import {By} from '@angular/platform-browser';
import {DefenseRelatedBenefitsQuestionComponent} from "./defense-related-benefits-question.component";

describe('DefenseRelatedBenefitsQuestionComponent', () => {
    let component: DefenseRelatedBenefitsQuestionComponent;
    let fixture: ComponentFixture<DefenseRelatedBenefitsQuestionComponent>;
    let responseData: ResponseData;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DefenseRelatedBenefitsQuestionComponent],
            providers: [ResponseData]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        responseData = TestBed.get(ResponseData);
        fixture = TestBed.createComponent(DefenseRelatedBenefitsQuestionComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should populate with answer in response data', async(() => {
        // given
        responseData.receiveDefenseRelatedBenefits = true;

        // when
        fixture.detectChanges();

        fixture.whenStable().then(() => {
            const yesOption = fixture.debugElement.query(By.css('#yes')).nativeElement;
            expect(yesOption.checked).toBeTruthy();
        });
    }));

    it('should set the response', () => {
        // when
        const yesOption = fixture.debugElement.query(By.css('#yes')).nativeElement;
        yesOption.click();

        // then
        expect(responseData.receiveDefenseRelatedBenefits).toBeTruthy();
    });
});
