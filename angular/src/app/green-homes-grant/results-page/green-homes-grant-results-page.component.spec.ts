import {Component, EventEmitter, Input, Output} from '@angular/core';
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {Observable} from 'rxjs/Observable';
import {ErrorObservable} from 'rxjs/observable/ErrorObservable';
import {SpinnerAndErrorContainerComponent} from "../../shared/spinner-and-error-container/spinner-and-error-container.component";
import {QuestionnaireService} from "../../questionnaire/questionnaire.service";
import {LinkButtonComponent} from "../../shared/link-button/link-button.component";
import {PageTitleService} from "../../shared/page-title-service/page-title.service";
import {GreenHomesGrantResultsPageComponent} from "./green-homes-grant-results-page.component";
import {GreenHomesGrantQuestionnaireComponent} from "../green-homes-grant-questionnaire/green-homes-grant-questionnaire.component";
import {GreenHomesGrantResultsStatus} from "./green-homes-grant-results-status";
import {GreenHomesGrantEligibility} from "../green-homes-grant-service/green-homes-grant-eligibility";
import {GreenHomesGrantService} from "../green-homes-grant-service/green-homes-grant.service";
import {ECOSelfReferralConsentData} from "../../eco-self-referral/eco-self-referral-consent-data";

describe('GreenHomesGrantResultsPageComponent', () => {
    let component: GreenHomesGrantResultsPageComponent;
    let fixture: ComponentFixture<GreenHomesGrantResultsPageComponent>;

    let eligibilityResponse: Observable<GreenHomesGrantEligibility>;
    const greenHomesGrantServiceStub = {
        getEligibility: () => eligibilityResponse,
    };

    const questionnaireServiceStub = {
        isComplete: () => true,
    };

    const pageTitleStub = {
        set: () => {}
    };

    beforeEach(async(() => {
        eligibilityResponse = Observable.of(GreenHomesGrantEligibility.NotCalculated);
        spyOn(greenHomesGrantServiceStub, 'getEligibility').and.callThrough();

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
                {provide: GreenHomesGrantService, useValue: greenHomesGrantServiceStub},
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

    it('should call Green Homes Grant service', () => {
        // when
        fixture.detectChanges();

        // then
        expect(greenHomesGrantServiceStub.getEligibility).toHaveBeenCalled();
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
        eligibilityResponse = Observable.of(GreenHomesGrantEligibility.LikelyEligible);

        // when
        fixture.detectChanges();

        // then
        expect(component.status).toEqual(GreenHomesGrantResultsStatus.Eligible);
    });

    it('should have ineligible status when person is ineligible', () => {
        // given
        eligibilityResponse = Observable.of(GreenHomesGrantEligibility.Ineligible);

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
