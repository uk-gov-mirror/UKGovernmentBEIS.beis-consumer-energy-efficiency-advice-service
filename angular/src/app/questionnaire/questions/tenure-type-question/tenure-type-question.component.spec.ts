import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';

import {ResponseData} from '../../../shared/response-data/response-data';
import {TenureTypeQuestionComponent} from './tenure-type-question.component';
import {TenureType} from './tenure-type';
import {MultipleChoiceQuestionComponent} from "../../common-questions/multiple-choice-question/multiple-choice-question.component";

describe('TenureTypeQuestionComponent', () => {
    let component: TenureTypeQuestionComponent;
    let fixture: ComponentFixture<TenureTypeQuestionComponent>;
    let responseData: ResponseData;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TenureTypeQuestionComponent, MultipleChoiceQuestionComponent],
            providers: [ResponseData]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        responseData = new ResponseData();
        fixture = TestBed.createComponent(TenureTypeQuestionComponent);
        component = fixture.componentInstance;
        spyOn(component.complete, 'emit');
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set the response when selecting an option', () => {
        // given

        // when
        fixture.debugElement.query(By.css('.private-tenancy')).nativeElement.click();

        // then
        expect(component.response).toBe(TenureType.PrivateTenancy);
    });

    it('should update the response data for owner occupancy', () => {
        const question = new TenureTypeQuestionComponent(responseData);

        question.response = TenureType.OwnerOccupancy;

        expect(responseData.tenureType).toBe(TenureType.OwnerOccupancy);
    });

    it('should update the response data for private tenancy', () => {
        const question = new TenureTypeQuestionComponent(responseData);

        question.response = TenureType.PrivateTenancy;

        expect(responseData.tenureType).toBe(TenureType.PrivateTenancy);
    });

    it('should update the response data for social tenancy', () => {
        const question = new TenureTypeQuestionComponent(responseData);

        question.response = TenureType.SocialTenancy;

        expect(responseData.tenureType).toBe(TenureType.SocialTenancy);
    });

    it('should pre-select the correct point', () => {
        responseData.tenureType = TenureType.SocialTenancy;
        const question = new TenureTypeQuestionComponent(responseData);

        expect(question.response).toBe(TenureType.SocialTenancy);
    });
});
