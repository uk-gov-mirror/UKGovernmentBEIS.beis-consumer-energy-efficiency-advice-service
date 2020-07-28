import {Component, EventEmitter, Input, Output} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Observable} from 'rxjs/Observable';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {EligibilityByGrant} from "../../grants/grant-eligibility-service/eligibility-by-grant";
import {SpinnerAndErrorContainerComponent} from "../../shared/spinner-and-error-container/spinner-and-error-container.component";
import {GrantEligibilityService} from "../../grants/grant-eligibility-service/grant-eligibility.service";
import {QuestionnaireService} from "../../questionnaire/questionnaire.service";
import {EcoHhcroHelpToHeat} from "../../grants/national-grant-calculator/grants/eco-hhcro-help-to-heat/eco-hhcro-help-to-heat";
import {NationalGrantCalculator} from "../../grants/national-grant-calculator/national-grant-calculator";
import {GrantEligibility} from "../../grants/grant-eligibility-service/grant-eligibility";
import {LinkButtonComponent} from "../../shared/link-button/link-button.component";
import {ECOSelfReferralConsentData} from "../../eco-self-referral/eco-self-referral-consent-data";
import {PageTitleService} from "../../shared/page-title-service/page-title.service";
import {GreenHomesGrantResultsPageComponent} from "./green-homes-grant-results-page.component";
import {GreenHomesGrantQuestionnaireComponent} from "../green-homes-grant-questionnaire/green-homes-grant-questionnaire.component";
import {GreenHomesGrantResultsStatus} from "./green-homes-grant-results-status";

describe('GreenHomesGrantResultsPageComponent', () => {
    let component: GreenHomesGrantResultsPageComponent;
    let fixture: ComponentFixture<GreenHomesGrantResultsPageComponent>;

    let eligibilityResponse: Observable<EligibilityByGrant>;
    const grantsEligibilityServiceStub = {
        getEligibilityByGrant: () => eligibilityResponse,
    };

    const questionnaireServiceStub = {
        isComplete: () => true,
    };

    const pageTitleStub = {
        set: () => {}
    };

    const dummyEligibilityResponse: EligibilityByGrant = {
        [EcoHhcroHelpToHeat.GRANT_ID]: {
            calculator: {} as NationalGrantCalculator,
            eligibility: GrantEligibility.NotCalculated,
        }
    };

    beforeEach(async(() => {
        eligibilityResponse = Observable.of(dummyEligibilityResponse);
        spyOn(grantsEligibilityServiceStub, 'getEligibilityByGrant').and.callThrough();

        TestBed.configureTestingModule({
            declarations: [
                GreenHomesGrantResultsPageComponent,
                GreenHomesGrantQuestionnaireComponent,
                SpinnerAndErrorContainerComponent,
                MockQuestionnaireComponent,
                LinkButtonComponent,
            ],
            imports: [
              RouterTestingModule.withRoutes([])
            ],
            providers: [
                {provide: GrantEligibilityService, useValue: grantsEligibilityServiceStub},
                {provide: QuestionnaireService, useValue: questionnaireServiceStub},
                {provide: ECOSelfReferralConsentData, useValue: new ECOSelfReferralConsentData()},
                {provide: PageTitleService, useValue: pageTitleStub}
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GreenHomesGrantResultsPageComponent);
        component = fixture.componentInstance;
    });

    it('should be constructed', () => {
        expect(component).toBeTruthy();
    });

    it('should call grants eligibility service', () => {
        // when
        fixture.detectChanges();

        // then
        expect(grantsEligibilityServiceStub.getEligibilityByGrant).toHaveBeenCalled();
    });

    it('should display an error message if grants eligibility service responds with an error', () => {
        // given
        eligibilityResponse = ErrorObservable.create('some error text');

        // when
        fixture.detectChanges();

        // then
        expect(component.isLoading).toBeFalsy();
        expect(component.isError).toBeTruthy();
    });

    it('should have eligible status when person is eligible', () => {
        // given
        dummyEligibilityResponse[EcoHhcroHelpToHeat.GRANT_ID].eligibility = GrantEligibility.LikelyEligible;

        // when
        fixture.detectChanges();

        // then
        expect(component.status).toEqual(GreenHomesGrantResultsStatus.Eligible);
    });

    it('should have ineligible status when person is ineligible', () => {
        // given
        dummyEligibilityResponse[EcoHhcroHelpToHeat.GRANT_ID].eligibility = GrantEligibility.Ineligible;

        // when
        fixture.detectChanges();

        // then
        expect(component.status).toEqual(GreenHomesGrantResultsStatus.Ineligible);
    });
});

@Component({
    selector: 'app-questionnaire',
    template: '<p>Mock Questionnaire Component</p>'
})
class MockQuestionnaireComponent {
    @Input() public questionnaireName: string;
    @Output() public onQuestionnaireComplete: EventEmitter<void> = new EventEmitter<void>();
}
