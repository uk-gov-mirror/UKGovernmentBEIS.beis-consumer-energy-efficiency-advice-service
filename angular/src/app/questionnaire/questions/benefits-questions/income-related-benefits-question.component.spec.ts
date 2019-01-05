import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ResponseData} from '../../../shared/response-data/response-data';
import {By} from '@angular/platform-browser';
import {IncomeRelatedBenefitsQuestionComponent} from "./income-related-benefits-question.component";

describe('IncomeRelatedBenefitsQuestionComponent', () => {
    let component: IncomeRelatedBenefitsQuestionComponent;
    let fixture: ComponentFixture<IncomeRelatedBenefitsQuestionComponent>;
    let responseData: ResponseData;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [IncomeRelatedBenefitsQuestionComponent],
            providers: [ResponseData]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        responseData = TestBed.get(ResponseData);
        fixture = TestBed.createComponent(IncomeRelatedBenefitsQuestionComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should populate with answer in response data', async(() => {
        // given
        responseData.receiveIncomeRelatedBenefits = true;

        // when
        fixture.detectChanges();

        fixture.whenStable().then(() => {
            const yesOption = fixture.debugElement.query(By.css('#yes-option'));
            expect(yesOption.classes.selected).toBeTruthy();
        });
    }));

    it('should set the response', () => {
        // when
        const yesOption = fixture.debugElement.query(By.css('#yes-option')).nativeElement;
        yesOption.click();

        // then
        expect(responseData.receiveIncomeRelatedBenefits).toBeTruthy();
    });
});
