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
import {GreenHomesGrantEligibility} from "../green-homes-grant-service/green-homes-grant-eligibility";
import {GreenHomesGrantService} from "../green-homes-grant-service/green-homes-grant.service";
import {ECOSelfReferralConsentData} from "../../eco-self-referral/eco-self-referral-consent-data";
import {ResponseData} from "../../shared/response-data/response-data";
import {OwnHome} from "../../questionnaire/questions/own-home-question/ownHome";
import { InlineSVGModule } from 'ng-inline-svg';

describe('GreenHomesGrantResultsPageComponent', () => {
    let component: GreenHomesGrantResultsPageComponent;
    let fixture: ComponentFixture<GreenHomesGrantResultsPageComponent>;
    let domElement: HTMLElement;
    let responseData: ResponseData;

    let eligibilityResponse: GreenHomesGrantEligibility;
    const greenHomesGrantServiceStub = {
        getEligibility: () => eligibilityResponse,
    };

    const questionnaireServiceStub = {
        isComplete: () => true,
    };

    const pageTitleStub = {
        set: () => {
        }
    };

    beforeEach(async(() => {
        responseData = new ResponseData();
        eligibilityResponse = GreenHomesGrantEligibility.PartiallyEligible;
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
                RouterTestingModule.withRoutes([]),
                InlineSVGModule
            ],
            providers: [
                {provide: GreenHomesGrantService, useValue: greenHomesGrantServiceStub},
                {provide: QuestionnaireService, useValue: questionnaireServiceStub},
                {provide: ECOSelfReferralConsentData, useValue: new ECOSelfReferralConsentData()},
                {provide: PageTitleService, useValue: pageTitleStub},
                {provide: ResponseData, useValue: responseData}
            ],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(GreenHomesGrantResultsPageComponent);
        component = fixture.componentInstance;
        domElement = fixture.debugElement.nativeElement;
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

    it('should have fully eligible status when person is fully eligible', () => {
        // given
        responseData.newBuild = false;
        responseData.englishProperty = true;
        responseData.ownsHome = OwnHome.Owner;
        eligibilityResponse = GreenHomesGrantEligibility.FullyEligible;

        // when
        fixture.detectChanges();

        // then
        expect(component.status).toEqual(GreenHomesGrantEligibility.FullyEligible);
        expect(domElement.querySelector('app-link-button').textContent)
            .toContain('Find out what measures you could get under the Green Homes Grant');
    });

    it('should have partial eligible status when person is partially eligible', () => {
        // given
        responseData.newBuild = false;
        responseData.englishProperty = true;
        responseData.ownsHome = OwnHome.Owner;
        eligibilityResponse = GreenHomesGrantEligibility.PartiallyEligible;

        // when
        fixture.detectChanges();

        // then
        expect(component.status).toEqual(GreenHomesGrantEligibility.PartiallyEligible);
        expect(domElement.querySelector('app-link-button').textContent)
            .toContain('Find out what measures you could get under the Green Homes Grant');
    });

    it('should display a message when a person is ineligible due to being a tenant', () => {
        responseData.ownsHome = OwnHome.Tenant;
        responseData.newBuild = false;
        responseData.englishProperty = true;
        eligibilityResponse = GreenHomesGrantEligibility.Ineligible;

        fixture.detectChanges();

        expect(component.status).toEqual(GreenHomesGrantEligibility.Ineligible);
        expect(domElement.querySelector('.ineligible-reason').textContent)
            .toContain('Sorry, you\'re not eligible for the Green Homes Grant because you rent your home.');
    });

    it('should display a message when a property is ineligible due to being outside of England', () => {
        responseData.englishProperty = false;
        responseData.newBuild = false;
        responseData.ownsHome = OwnHome.Owner;
        eligibilityResponse = GreenHomesGrantEligibility.Ineligible;

        fixture.detectChanges();

        expect(component.status).toEqual(GreenHomesGrantEligibility.Ineligible);
        expect(domElement.querySelector('.ineligible-reason').textContent)
            .toContain('Sorry, you\'re not eligible for the Green Homes Grant because your home is not in England.');
    });

    it('should display a message when property is ineligible because it is a new build', () => {
        responseData.newBuild = true;
        responseData.englishProperty = true;
        responseData.ownsHome = OwnHome.Owner;
        eligibilityResponse = GreenHomesGrantEligibility.Ineligible;

        fixture.detectChanges();

        expect(component.status).toEqual(GreenHomesGrantEligibility.Ineligible);
        expect(domElement.querySelector('.ineligible-reason').textContent)
            .toContain('Sorry, you\'re not eligible for the Green Homes Grant because your home is a new build.');
    });

    it('should display a single message when the property is both outside England and a new build', () => {
        responseData.newBuild = true;
        responseData.ownsHome = OwnHome.Owner;
        responseData.englishProperty = false;
        eligibilityResponse = GreenHomesGrantEligibility.Ineligible;

        fixture.detectChanges();
        expect(component.status).toEqual(GreenHomesGrantEligibility.Ineligible);
        expect(domElement.querySelectorAll('.ineligible-reason').length).toBe(1);
        expect(domElement.querySelector('.ineligible-reason').textContent)
            .toContain('Sorry, you\'re not eligible for the Green Homes Grant because your home is not in England.');
    });

    it('should display a single message when the property is both outside England and rented', () => {
        responseData.newBuild = false;
        responseData.ownsHome = OwnHome.Tenant;
        responseData.englishProperty = false;
        eligibilityResponse = GreenHomesGrantEligibility.Ineligible;

        fixture.detectChanges();
        expect(component.status).toEqual(GreenHomesGrantEligibility.Ineligible);
        expect(domElement.querySelectorAll('.ineligible-reason').length).toBe(1);
        expect(domElement.querySelector('.ineligible-reason').textContent)
            .toContain('Sorry, you\'re not eligible for the Green Homes Grant because your home is not in England.');
    });

    it('should display a single message when the property is both rented and a new build', () => {
        responseData.newBuild = true;
        responseData.ownsHome = OwnHome.Tenant;
        responseData.englishProperty = true;
        eligibilityResponse = GreenHomesGrantEligibility.Ineligible;

        fixture.detectChanges();
        expect(component.status).toEqual(GreenHomesGrantEligibility.Ineligible);
        expect(domElement.querySelectorAll('.ineligible-reason').length).toBe(1);
        expect(domElement.querySelector('.ineligible-reason').textContent)
            .toContain('Sorry, you\'re not eligible for the Green Homes Grant because you rent your home.');
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
